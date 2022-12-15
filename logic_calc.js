let menu_btn = document.querySelector("#menu_btn");
let dropdown = document.querySelector(".dropdown");

let c_btn = document.querySelector("#c_btn");

c_btn.onclick = function(){

   /*Variables*/

    const op = ["OR","AND","NOT","IMPLIES","IFF","∧","∨","→","↔","¬"]; /*List of operators*/
    var variables = []; /*List of variables*/

    var inputs1 = document.querySelector("#prname").value.split(/\r?\n/); //Take in input
    var inputs2 = document.querySelector("#cname").value.split(/\r?\n/);
    var table = document.querySelector("#result_table");
    var res = document.querySelector("#res_t");
    
    table.innerHTML = "";
    res.innerHTML = "<h1>Result<h1>";

    var index = "";
    for(var i = inputs1.length - 1; i >= 0; i--) {
        if(inputs1[i] === index) {
            inputs1.splice(i, 1);
        }
    }
    for(var i = inputs2.length - 1; i >= 0; i--) {
        if(inputs2[i] === index) {
            inputs2.splice(i, 1);
        }
    }

    inputs1.forEach(get_var); //get the variables
    inputs2.forEach(get_var);

    const n = variables.length;
    var m;
    if(inputs1[0] != "") m = inputs1.length;
    else m = 0;
    var l;
    if(inputs2[0] != "") l = inputs2.length;
    else l = 0;
    
    if(m == 0){
        return;
    }

    v_table = [];
    pr_table = [];
    c_table = [];
    n_arr = [];
    c_arr = [];

    /*Functions*/

    function get_var(sentence){
        sentence = sentence.toUpperCase();
        sentence = sentence.replace(/([\(\)])/g, ' $1 ').trim();
        sentence = sentence.replace(/ +/g,' ');
        sentence = sentence.replace(/(∧|∨|→|↔|¬)/g,' $1 ').trim();
        var words = sentence.split(/ /);
        words.forEach(word =>{
            word = word.replace(/\(/gi,"");
            word = word.replace(/\)/gi,"");
            if(!(variables.includes(word) || (op.includes(word)))){
                if(word.length == 1) variables.push(word);
                else{
                    /*Error*/
                }
            }
        });
    }
    
    function get_Tvalue(v1,v2,op){
        switch(op){
            case  0 : return (v1 || v2);
            case  1 : return (v1 && v2);
            case  2 : return (!v1);
            case  3 : return ((!v1)|| v2);
            case  4 : return( v1 == v2 );
            default: /*Error*/ break;
;        }            
    }

    function parse(v_dict,sentence){

        sentence = sentence.replace(/ /g,"");
        sentence = sentence.replace(/(OR|∨)/gi,"0");
        sentence = sentence.replace(/(AND|∧)/gi,"1");
        sentence = sentence.replace(/(NOT|¬)/gi,"2");
        sentence = sentence.replace(/(IMPLIES|→)/gi,"3");
        sentence = sentence.replace(/(IFF|↔)/gi,"4");

        var stack = [];
        var v_stack = [];
        var op_stack = [];

        sentence.split("").forEach(w => {
            if(w == '('){
                stack.push('(');
            }
            else if(w == ')'){
                stack.pop();
                if (op_stack.at(-1) == 2){
                    v_stack.push(get_Tvalue(v_stack.pop(),null,op_stack.pop()));
                }
                else if(op_stack.length == 0); //Do nothing
                else{
                var v2 = v_stack.pop();
                var v1 = v_stack.pop();
                v_stack.push(get_Tvalue(v1,v2,op_stack.pop()));
                }
            }
            else if(!isNaN(w)){
                op_stack.push(parseInt(w));
            }
            else {
                v_stack.push(v_dict[w]);
            }
        });

        if(stack.length != 0){ //Make for op stack as well
            /*Error*/
        }

        return v_stack.pop();
    }

     /*Calculation*/

    for (let i = 0;i < 2**n;i++) {
        var arr = [];
        var bin = i.toString(2).padStart(n,'0');
        for(let j = 0;j<n;j++){
            arr[j] =  !parseInt(bin[j]);
        }
        v_table.push(arr);
    }
    
    for (let i = 0; i < 2**n; i++) {
        let dict = {};
        let row  = v_table[i];
        let pr_row = [];
        let c_row = [];
        
        variables.forEach((key, k) => dict[key] = row[k]);
        inputs1.forEach((sentence,l) => pr_row[l] = parse(dict,sentence));
        inputs2.forEach((sentence,l)=> {
            c_row[l] = parse(dict,sentence);
        });

        pr_table.push(pr_row);
        c_table.push(c_row);
    }

    pr_table.forEach((row,k) =>{
        var x = 0;
        row.forEach(el=>{ if(!el) x = 1;});
        if(x == 0) n_arr.push(k);
    });

    for(let i = 0;i < c_table[0].length;i++){
        var x = 0;
        n_arr.forEach((el)=>{
            if(!c_table[el][i]) x = 1;
        });
        if((x == 0) && !(c_arr.includes(i))) c_arr.push(i);
    }

    /*Display*/
    var z = l+m;
    table.style.gridTemplateColumns = "repeat("+n+",1fr) repeat("+z+",2fr)";
    table.style.fontSize = '';

    table.innerHTML += '<p id = "pr">Premises</p>';
    document.getElementById('pr').style.gridColumn = (n+1).toString()+'/'+(n+m+1).toString();
    if(l != 0){
    table.innerHTML += '<p id = "c">Conclusions</p>';
    document.getElementById('c').style.gridColumn = (n+m+1).toString()+'/'+(n+m+l+1).toString();
    }

    /[OR¬]/

    variables.forEach((el,i) =>{
        var k = document.createElement("p");
        k.style.gridColumn = i.toString;
        k.appendChild(document.createTextNode(el));
        table.appendChild(k);
    });
    inputs1.forEach((sentence,i) =>{
        sentence = sentence.slice(1,-1); 
        sentence = sentence.replace(/(OR|∨)/gi,"\\(\\lor\\)");
        sentence = sentence.replace(/(AND|∧)/gi,"\\(\\land\\)");
        sentence = sentence.replace(/(NOT|¬)/gi,"\\(\\lnot\\)");
        sentence = sentence.replace(/(IMPLIES|→)/gi,"\\(\\Rightarrow\\)");
        sentence = sentence.replace(/(IFF|↔)/gi,"\\(\\iff\\)");
        
        var k = document.createElement("p");
        k.style.gridColumn = (n+i).toString;
        k.appendChild(document.createTextNode(sentence));
        table.appendChild(k);
    });
    inputs2.forEach((sentence,i) =>{
        sentence = sentence.slice(1,-1); 
        sentence = sentence.replace(/(OR|∨)/gi,"\\(\\lor\\)");
        sentence = sentence.replace(/(AND|∧)/gi,"\\(\\land\\)");
        sentence = sentence.replace(/(NOT|¬)/gi,"\\(\\lnot\\)");
        sentence = sentence.replace(/(IMPLIES|→)/gi,"\\(\\Rightarrow\\)");
        sentence = sentence.replace(/(IFF|↔)/gi,"\\(\\iff\\)");
        
        var k = document.createElement("p");
        k.style.gridColumn = (n+i).toString;
        k.appendChild(document.createTextNode(sentence));
        table.appendChild(k);
    });
    
    table.innerHTML += '<div id = "hl"></div>';
    document.getElementById('hl').style.width = "100%";
    document.getElementById('hl').style.height = "2px";
    document.getElementById('hl').style.gridColumn = "1/-1";
    document.getElementById('hl').style.background = 'var(--primary)';

    for (let i = 0; i < 2**n; i++) {
        let v = v_table[i];
        let pr = pr_table[i];
        let c = c_table[i];
        
        for (let j = 0; j < n; j++) {
            let x = ("true".localeCompare(v[j])) ? 'F' : 'T';
            var k = document.createElement("p");
            k.appendChild(document.createTextNode(x));
            table.appendChild(k);
        }
        for (let j = 0; j < m; j++) {
            let x = ("true".localeCompare(pr[j])) ? 'F' : 'T';
            var k = document.createElement("p");
            k.appendChild(document.createTextNode(x));
            table.appendChild(k);
        }
        for (let j = 0; j < l; j++) {
            let x = ("true".localeCompare(c[j])) ? 'F' : 'T';
            var k = document.createElement("p");
            k.appendChild(document.createTextNode(x));
            table.appendChild(k);
        }
       
    }
    
    c_arr.forEach((el)=>{

        inputs2[el] = inputs2[el].slice(1,-1); 
        inputs2[el] = inputs2[el].replace(/OR/gi,"\\(\\lor\\)");
        inputs2[el] = inputs2[el].replace(/AND/gi,"\\(\\land\\)");
        inputs2[el] = inputs2[el].replace(/NOT/gi,"\\(\\lnot\\)");
        inputs2[el] = inputs2[el].replace(/IMPLIES/gi,"\\(\\Rightarrow\\)");
        inputs2[el] = inputs2[el].replace(/IFF/gi,"\\(\\iff\\)");
        
        var k = document.createElement("p");
        k.appendChild(document.createTextNode("With the given Premises, the conclusion "+inputs2[el]+" is valid"));
        res.appendChild(k);
    })

    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
}

menu_btn.onclick = function(){
    dropdown.classList.toggle("active");
    menu_btn.classList.toggle("rot");
}