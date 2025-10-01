// task 1: change text
let text1 = document.getElementById("task1");
// according to the test file, the text needs to be set to this string exactly:
text1.innerText = "Changed using 'innerText'.";

// task 2: adding a button
let task2 = document.getElementById("task2");
// notes: a lot of these properties seem to be strings
// they can probably be treated as strings for the most part
// so I can add something to the innerHTML without deleting everything else using +=
task2.innerHTML += "<br> <button> Submit </button>";

// task 3: the background color
document.body.style.backgroundColor = "#232323"; // set the style of the body to have this as the background color
// now it's impossible to read; change the text color to white
document.body.style.color = "#ffffff";

// now the links are still impossible to read, but how do I handle pseudoclasses in JavaScript?
{
    // using some unnecessary code to make it easier to read and to practice looking at documentation
    // found methods and method syntax on developer.mozilla.org
    // my IDE, VS Code, both suggests methods and links to MDN when hovering over those methods
    let styles = document.createElement("style"); // make a new stylesheet
    document.head.appendChild(styles); // add stylesheet to document head
    let styleSheet = styles.sheet; // get stylesheet
    styleSheet.insertRule("a {color: #00e1ff}"); // insert new rules; same syntax as css
    styleSheet.insertRule("a:visited {color: #669cff}");
}

// task 4: give items a border
let items = document.getElementsByClassName("item");
// could use stylesheet insertRule() method instead
for (const item of items) {
    item.style.border = "1px solid white"; // same syntax as css; width, style, color
}

// task 5: change href attribute
let task5 = document.getElementById("task5");
// notes:
// task5 is type 'a', same name as in html
// <a href="link">... in JavaScript is a.href = "link"
task5.href = "https://www.springboard.com/"; 

// task 6: input default value
let task6 = document.getElementById("task6");
// notes: 'placeholder' is what shows in the box, but will disappear when client starts typing
// value is what is in the box right now; client would have to erase 'DOM Master' to type their own input
task6.value = "DOM Master"; // this will already be in the textbox when client loads page

// task 7: add a new class to an element
let task7 = document.getElementById("task7");
// notes:
// an element has a property called classList which is a DOMTokenList (array-ish) of all the classes the element is in
// it has an add method to add more classes and probably has a delete too
task7.classList.add("new-class");

// task 8: append a new element
let task8 = document.getElementById("task8"); // get reference to task8 element
let button8 = document.createElement("button"); // make a new element
task8.appendChild(button8); // place element in DOM, as a child of task8

// the button that appeared is extremely small and is in-line
button8.textContent = "New Button"; // add some text to fix its size
// cannot put button on new line; it needs to be the first child of task8 for the test to succeed

// task 9: removing an element
let task9 = document.getElementById("task9"); // get element to remove
let parent9 = task9.parentNode; // removeChild() needs to be called from the parent node
// note: I tried both task9.parentNode and task9.parentElement
// both were able to remove the child even though parentElement is not the correct type
// HTMLElement may inherit the method from Node?
parent9.removeChild(task9)
