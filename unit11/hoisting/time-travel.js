/* Task 1: Declare a Destination Variable */
let destination = "Ancient Egypt"; // using let, not const; destination may change
console.log(destination);

/* Task 2: Change the Destination */
destination = "Medieval Europe";
console.log(destination);

/* Task 3: Declare a Constant Travel Date */
const travelDate = "2024-03-15";
// travelDate = "2024-04-01"; // commented out due to error
/*
 * Observations:
 * My IDE gives me an error saying "'travelDate' is constant." const variables can't be changed, so it's correct in 
 * giving me an error when I try to change it.
 */

/* Task 4: Experiment with Variable Hoisting */
console.log(timeMachineModel);
var timeMachineModel = "T-800";
/*
 * Observations:
 * After typing the first line, my IDE correctly complained that timeMachineModel doesn't exist. 
 * However, after I typed the second line, even though it's underneath the first and would normally happen afterwards, 
 * the error went away. JavaScript must have hoisted the timeMachineModel declaration back in time so that it happened
 * before it got logged to the console.
 */
