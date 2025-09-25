/* Task 1: Compile Participant Details with Shorthand Property Names */
let name = "John Doe"; // initialize properties
let age = 44;
let studyField = "Literature";

let participant = {
    name, // when property name and variable name are the same, just put the name
    age, // could also define properties in here rather than making variables? unless there are multiple participants
    studyField
};
console.log(participant);


/* Task 2: Implement a Shorthand Function for Participant Info */
let participantCopy = {
    ...participant, // copy in all properties from participants
    displayInfo() // add in a new method; the word 'function' isn't required when making an object like this
    {
        console.log(`Copy of participant information retrieved. Name: ${this.name}, Age: ${this.age}, Field of Study: ${this.studyField}`);
    }
};
participantCopy.displayInfo(); // call new method from new copied object


/* Task 3: Implement a Same Shorthand Arrow Function for Participant Info */
let participantOtherCopy = {
    ...participant,
    displayInfo: () => // setting properties needs a colon and arrow functions don't get the special method shorthand like normal functions
    {
        console.log(`Secondary copy of participant information retrieved. Name: ${this.name}, Age: ${this.age}, Field of Study: ${this.studyField}`);
    }
};
participantOtherCopy.displayInfo();
/*
 * Observations:
 * Because arrow functions don't have access to 'this', all three properties return undefined.
 */


/* Task 4: Using Computed Property Names */

// First, actually add the displayInfo method to the original object so printing details is easier:
participant.displayInfo = function ()
{
    console.log(`Participant information retrieved. Name: ${this.name}, Age: ${this.age}, Field of Study: ${this.studyField}`);
};

// make a method that will set the <propertyName> of <targetObject> to <propertyValue>
function updateParticipantInfo(propertyName, propertyValue, targetObject)
{
    // notes: objects' properties can be accessed by property name, which is a string
    // this means strings can be passed in and properties can be dynamically changed
    // the syntax is like that of a dictionary: object[key] = value
    targetObject[propertyName] = propertyValue;
    return targetObject;
}
updateParticipantInfo("name", "John H Doe", participant); // try to change properties of original participant object
participant.displayInfo(); // use new displayInfo() method to check if name property was changed
