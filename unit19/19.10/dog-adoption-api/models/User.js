// schema for user information

const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
        validate: [isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minLength: [8, "Password must be at least 8 characters"]
    }
});

// pre method; this function is called by mongoose right before saving a doc to the user db
userSchema.pre("save", async function () {
    // encrypt password before saving
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    // continue with newly hashed password
});

// static method to log user in
userSchema.statics.login = async function(email, password) {
    // find user's email in db
    const user = await this.findOne({ email }); // find user with matching email
    if (user) {
        // email is in db; compare passwords
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        // password didn't match, but email did
        throw Error("incorrect password");
    }

    // couldn't find user with that email
    throw Error("incorrect email");
}

// create new model
const User = mongoose.model("user", userSchema); // collection must be called 'users', plural of the model

module.exports = User; // export model
