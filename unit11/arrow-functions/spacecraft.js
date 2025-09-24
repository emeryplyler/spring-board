/* Task 1: No Parameters: Activate Hyperdrive */
// Write an arrow function named `activateHyperdrive` with no parameters that print `"Hyperdrive activated!"` to the console. Call `activateHyperdrive` to test it.
const activateHyperdrive = () => { console.log("Hyperdrive activated!"); };
activateHyperdrive();

/* Task 2: Implicit Return: Scan for Lifeforms */
// Create an arrow function named `scanForLife` that implicitly returns `"No lifeforms detected"` without using curly braces. Print the result of calling `scanForLife`.
const scanForLife = () => "No lifeforms detected"; // since there's only one thing to do which is return something, no curly braces needed
console.log(scanForLife());

/* Task 3: Implicit Return with Objects: Log Coordinates */
// Write an arrow function named `currentCoordinates` that returns an object with properties `x`, `y`, and `z`, representing coordinates in space. Use implicit return. Print the returned object from `currentCoordinates`.
// notes: using the normal expression-body syntax doesn't work here; the curly braces probably get interpreted as a block-body instead
// the fix is to put it in parentheses
const currentCoordinates = () => ({ x: 0, y: 0, z: 0 });
console.log(currentCoordinates());

/* Task 4: Understanding `this`: Message from Home Base */
// Inside an object named `spacecraft`, create a method named `receiveMessage` using arrow function syntax. This method should log `"Message received: "` followed by a message it receives as a parameter. Directly call `receiveMessage` within `spacecraft` and observe. Observe and explain the behavior of `this` in this context as a comment.
const spacecraft = {
    id: "A087F-NT", // the name/id of the spacecraft to test in other methods
    // notes: syntax for adding a method to an object is like this:
    receiveMessage: (m) => console.log(`${this.id} - Message received: ${m}`),
    // the console.log part is implicitly returned

    // example function that calls receiveMessage() within the spacecraft object
    messageLog: () => console.log(`Received ${receiveMessage("Greetings")}.`)
}
spacecraft.receiveMessage("Greetings");
spacecraft.messageLog();
/*
 * Observations:
 * When calling receiveMessage(), this.id returns undefined because receiveMessage() doesn't have "this".
 * When calling messageLog(), the program crashes with a ReferenceError because within messageLog(), receiveMessage() is not defined.
 * Arrow functions don't have a "this" and can't access the object they're a part of,
 * so receiveMessage() doesn't know what "this" means
 * and messageLog() can't actually see that spacecraft has another method called receiveMessage().
 */
