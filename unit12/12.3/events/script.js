// only act after the page has been loaded:
document.addEventListener("DOMContentLoaded", (ev) => {
    // 1: user can set a color for boxes; affects all existing boxes and new boxes created afterwards
    let boxColor = "#000000"; // default to black
    let currentBoxId = 0; // increments as boxes are added

    // get color from the color-form form element
    let colorForm = document.getElementById("color-form");
    let colorInput = colorForm.querySelector("input"); // get the input information

    // on submit, set the box color
    colorForm.addEventListener("submit", (ev) => {
        ev.preventDefault(); // don't refresh the page!

        // set box color value
        boxColor = colorInput.value;

        // now that boxColor is updated, update the color of all existing boxes
        let boxes = document.getElementsByClassName("box");
        for (const box of boxes) {
            box.style.backgroundColor = boxColor;
        }

        // because we're not refreshing the page, make sure to clear the form after submitting
        colorInput.value = "";
    });

    // 2: user can add new boxes to box-container
    let newBoxButton = document.getElementById("new-box-button");
    let boxContainer = document.getElementById("box-container");

    // helper function that adds a box to the right place of the right color
    function addBox() {
        // using paragraphs since they have text built-in
        let newBox = document.createElement("p");
        
        // 6: every box should have the 'box' class
        newBox.classList.add("box"); // make sure the box is in the 'box' class
        
        // every box needs an id and a color
        newBox.style.backgroundColor = boxColor; // set to the current color we're using

        // make and set a new custom (data) attribute for the box's id
        newBox.setAttribute("data-box-id", currentBoxId);
        currentBoxId++; // increment box id counter

        // 4: boxes should display their IDs
        newBox.textContent = newBox.getAttribute("data-box-id");

        boxContainer.appendChild(newBox); // add newBox as a child of 'box-container'
    }

    // first case: user presses the button
    newBoxButton.addEventListener("click", () => { addBox(); });
    // second case: user presses a key
    document.addEventListener("keyup", (ev) => {
        // javascript handles capitalized key inputs differently
        if (ev.key === "n" || ev.key === "N") {
            // bug fixing: ignore this if, for some reason, the user is typing the letter n in the color input box
            // Node.contains(child) will return true or false depending on if child is within Node
            if (!colorForm.contains(document.activeElement)) addBox();
        }
    });

    // 3: user can delete boxes when they're double-clicked
    // use the parent as a delegate:
    boxContainer.addEventListener("dblclick", (ev) => {
        if (ev.target.classList.contains("box")) {
            boxContainer.removeChild(ev.target);
        }
    });

    // 5: when hovering over a box, show the box's coordinates
    boxContainer.addEventListener("mouseover", (ev) => {
        if (ev.target.classList.contains("box")) {
            // getBoundingClientRect recommended by StackOverflow and 1stwebdesigner.com
            let boxBounds = ev.target.getBoundingClientRect();
            // notes:
            // the position of the top of the box relative to the window +
            // how far down the window has been scrolled will always add up to the absolute Y coord.
            // as boxtop decreases (it moves upwards as you scroll down and Y axis increases downwards),
            // scrollY increases because you're that amount of pixels farther downwards
            // similar for left and X coord
            let x = boxBounds.left + window.scrollX;
            let y = boxBounds.top + window.scrollY;
            ev.target.textContent = `${x.toFixed(2)}, ${y.toFixed(2)}`;
        }
    });

    // need another listener to reset the text back to the id
    boxContainer.addEventListener("mouseout", (ev) => {
        if (ev.target.classList.contains("box")) {
            ev.target.textContent = ev.target.getAttribute("data-box-id");
        }
    });
});
