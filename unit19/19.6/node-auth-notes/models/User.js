// create schema for user information, create model using schema
const mongoose = require("mongoose");
const { isEmail } = require("validator"); // third-party email validation function

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

// collection will be called "users"; the name of the model here must be "user", singular
const User = mongoose.model('user', userSchema);

module.exports = User;
