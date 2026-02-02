// create schema for user information, create model using schema
const mongoose = require("mongoose");
const { isEmail } = require("validator"); // third-party email validation function

// define schema:

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"], // the second value in the array is the unique error message relating to this property
        unique: true, // an email can't be used twice
        lowercase: true, // convert to lowercase before storing in db
        validate: [isEmail, "Please enter a valid email"] // the validation function for this property
    },
    password: {
        type: String,
        required: [true, "Please enter a valid password"],
        minlength: [6, "Password must be at least 6 characters"] // minimum length of password
    }
});


// attach some hook functions to the user schema:

// function that will be called after a doc is saved to db
userSchema.post('save', function (doc, next) {
    console.log('new user was created and saved', doc);
    next(); // if the post function has two parameters, you have to call next() and the second parameter has to be 'next'
});

// function that will be called right before doc is saved to db
// function is not anonymous arrow function because we want to use the keyword 'this'
userSchema.pre('save', function () {
    console.log('user about to be created and saved', this); // output local instance of saved user
});


// create new model:

// collection will be called "users"; the name of the model here must be "user", singular
const User = mongoose.model('user', userSchema);

module.exports = User;
