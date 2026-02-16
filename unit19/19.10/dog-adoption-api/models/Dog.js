// create model for dog information

const mongoose = require("mongoose");

const dogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a name"]
    },
    breed: String,
    description: String,
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: "User" // reference users table that the User schema is attached to
    }
});

// create new model
const Dog = mongoose.model("dog", dogSchema); // collection must be called 'users', plural of the model

module.exports = Dog; // export model
