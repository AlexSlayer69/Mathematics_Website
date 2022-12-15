//alert('Hello World'); //Don't use for debugging
console.log('Hello World');
//Consoles are great for debugging
console.error('This is an error');
console.warn('This is a warning');
//var : don't use (global scope always)
//let : block level scope
//const : is constant use always unless reassigned
let age = 30;
age = 19;
console.log(age);
//data type: Numbers,Strings,Boolean,null,undefined,symbol
const name = 'Alex';
const score = 30;
const rate = 4.5;
const isF  = true;
const x = null; //empty shows as object(error)
const y = undefined;
let f; //also undefined
console.log(typeof rate);

//concat
console.log('My name is '+name+' and age is '+age);
//template strings
console.log(`My name is ${name} and I am ${age}`);
console.log(name.length);

//constructor
const numbers = new Array(1,2,3,4,5);
console.log(numbers,numbers[1]);
const fruits = ['apples','oranges',true,1];
console.log(fruits);
//Both are arrays
console.log(fruits.indexOf('sfg'));

const person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    hobbies: ['music','movies'],
    address:{
        city:'boston'
    }
}
//person.firstName
const {firstName, lastName,address:{city}} = person;
console.log(firstName,city);