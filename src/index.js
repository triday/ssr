import  "./css/style.css";

createTitle('hello,world');


function createTitle(text){
   var h1= document.createElement('h1');
   h1.innerText=text;
   document.body.appendChild(h1);
}