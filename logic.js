
/*Variables*/

let menu_btn = document.querySelector("#menu_btn");
let dropdown = document.querySelector(".dropdown");

let ex_1 = document.querySelector("#ex_drop_1");
let ex_2 = document.querySelector("#ex_drop_2");

let box_1 = document.querySelector("#game1_drop1");
let box_2 = document.querySelector("#game1_drop2");
let box_3 = document.querySelector("#game1_drop3");
let box_4 = document.querySelector("#game1_drop4");
let box_5 = document.querySelector("#game1_drop5");

let check_1 = document.querySelector("#check_1");
let cross_1 = document.querySelector("#cross_1");

let check_2 = document.querySelector("#check_2");
let cross_2 = document.querySelector("#cross_2");

let check_3 = document.querySelector("#check_3");
let cross_3 = document.querySelector("#cross_3");
let check_4 = document.querySelector("#check_4");
let cross_4 = document.querySelector("#cross_4");
let check_5 = document.querySelector("#check_5");
let cross_5 = document.querySelector("#cross_5");
let check_6 = document.querySelector("#check_6");
let cross_6 = document.querySelector("#cross_6");
let check_7 = document.querySelector("#check_7");
let cross_7 = document.querySelector("#cross_7");

/*Functions*/

ex_1.onmouseover = function(){
    if(ex_1.innerHTML === ""){
        ex_1.classList.remove("dropped");
        cross_1.classList.add("hide");
        check_1.classList.add("hide");
    }
    else{
        ex_1.classList.add("dropped");
        if(ex_1.firstChild.id == "drag_cloud"){
            check_1.classList.remove("hide");
            cross_1.classList.add("hide");
        }
        else{
            cross_1.classList.remove("hide");
            check_1.classList.add("hide");
        }
    }
}

ex_2.onmouseover = function(){
    if(ex_2.innerHTML === ""){
        ex_2.classList.remove("dropped");
        cross_2.classList.add("hide");
        check_2.classList.add("hide");
    }
    else{
        ex_2.classList.add("dropped");
        if(ex_2.firstChild.id == "drag_rain"){
            check_2.classList.remove("hide");
            cross_2.classList.add("hide");
    }
        else{
            cross_2.classList.remove("hide");
            check_2.classList.add("hide");
        }
    }
}

/*Box Functions*/

box_1.onmouseover = function(){
    if(box_1.innerHTML === ""){
        box_1.classList.remove("dropped");
        cross_3.classList.add("hide");
        check_3.classList.add("hide");
    }
    else{
        box_1.classList.add("dropped");
        if(box_1.firstChild.id == "drag_op1"){
            check_3.classList.remove("hide");
            cross_3.classList.add("hide");
    }
        else{
            cross_3.classList.remove("hide");
            check_3.classList.add("hide");
        }
    }
}

box_2.onmouseover = function(){
    if(box_2.innerHTML === ""){
    box_2.classList.remove("dropped");
        cross_4.classList.add("hide");
        check_4.classList.add("hide");
    }
    else{
        box_2.classList.add("dropped");
        if(box_2.firstChild.id == "drag_op2"){
            check_4.classList.remove("hide");
            cross_4.classList.add("hide");
    }
        else{
            cross_4.classList.remove("hide");
            check_4.classList.add("hide");
        }
    }
}

box_3.onmouseover = function(){
    if(box_3.innerHTML === ""){
        box_3.classList.remove("dropped");
        cross_5.classList.add("hide");
        check_5.classList.add("hide");
    }
    else{
        box_3.classList.add("dropped");
        if(box_3.firstChild.id == "drag_op3"){
            check_5.classList.remove("hide");
            cross_5.classList.add("hide");
    }
        else{
            cross_5.classList.remove("hide");
            check_5.classList.add("hide");
        }
    }
}

box_4.onmouseover = function(){
    if(box_4.innerHTML === ""){
        box_4.classList.remove("dropped");
        cross_6.classList.add("hide");
        check_6.classList.add("hide");
    }
    else{
        box_4.classList.add("dropped");
        if(box_4.firstChild.id == "drag_op4"){
            check_6.classList.remove("hide");
            cross_6.classList.add("hide");
    }
        else{
            cross_6.classList.remove("hide");
            check_6.classList.add("hide");
        }
    }
}

box_5.onmouseover = function(){
    if(box_5.innerHTML === ""){
        box_5.classList.remove("dropped");
        cross_7.classList.add("hide");
        check_7.classList.add("hide");
    }
    else{
        box_5.classList.add("dropped");
        if(box_5.firstChild.id == "drag_op5"){
            check_7.classList.remove("hide");
            cross_7.classList.add("hide");
    }
        else{
            cross_7.classList.remove("hide");
            check_7.classList.add("hide");
        }
    }
}

/*Drop Functions*/

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev,el) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    el.appendChild(document.getElementById(data));
}
       
function drop_ex(ev,el){
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    if(el.innerHTML === ""){
        el.appendChild(document.getElementById(data));
    }
}

/*Scroll Effects */

var one = document.getElementById("num1");
var two = document.getElementById("num2")
var three = document.getElementById("num3")
var four = document.getElementById("num4")
var change_text = document.getElementById("name");


window.addEventListener("scroll", function() {
    
    if (window.scrollY < one.offsetTop) change_text.style.opacity = 0;

    else if (window.scrollY > one.offsetTop && 
        window.scrollY < two.offsetTop - 650) {
         change_text.textContent = one.firstElementChild.textContent;
         change_text.style.opacity = 1;
         change_text.style.paddingLeft = "4rem";
    }

    else if (window.scrollY > two.offsetTop -650 && 
        window.scrollY < two.offsetTop) change_text.style.opacity = 0;

    else if (window.scrollY > two.offsetTop && 
        window.scrollY < three.offsetTop -650) {
         change_text.style.opacity = 1;
         change_text.textContent = two.firstElementChild.textContent;
         change_text.style.paddingLeft = "4rem";
        }

    else if (window.scrollY > three.offsetTop -650 && 
            window.scrollY < three.offsetTop) change_text.style.opacity = 0;

    else if (window.scrollY > three.offsetTop && 
            window.scrollY < four.offsetTop -650) {
                 change_text.style.opacity = 1;
                 console.log(change_text);
                 change_text.textContent = three.firstElementChild.textContent;
                 change_text.style.paddingLeft = "8rem";
            }

    else if (window.scrollY > four.offsetTop -650 && 
                window.scrollY < four.offsetTop) change_text.style.opacity = 0;
    
    else if (window.scrollY > four.offsetTop) {
                     change_text.style.opacity = 1;
                     change_text.textContent = four.firstElementChild.textContent;
                     change_text.style.paddingLeft = "10rem";
                }
  });
  
/*Lightbar*/

var sc = document.querySelector("scroller");
var height = document.documentElement.scrollHeight
-document.documentElement.clientHeight;

window.onscroll = function(){
    sc.style.width = `${((scrollY/height)*100)}%`
}