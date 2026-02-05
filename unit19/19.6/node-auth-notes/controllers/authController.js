const User = require("../models/User"); // import user model
const jwt = require("jsonwebtoken");
require('dotenv').config({quiet: true});

// error handling function
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "" };

    // incorrect email error
    if (err.message === "Email not registered") {
        errors.email = "No user with that email was found";
    }

    // incorrect password error
    if (err.message === "Incorrect password") {
        errors.password = "Password is incorrect";
    }

    // duplicate email error
    if (err.code === 11000) {
        errors.email = "That email is already registered";
        return errors;
    }

    // validation errors
    if (err.message.includes("user validation failed")) {
        // cycle through each error in the err.errors array
        // destructure each array item, retrieve only the 'properties' property
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message; // dynamic key; key is the same as properties.path, so this will automatically update the right property without us needing to do if-elses
        });
    }

    return errors;
}

const maxAge = 24 * 60 * 60; // 24 hrs, in seconds
// json web token maker function
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    });
}

module.exports.signup_get = (req, res) => {
    res.render('signup'); // render the signup page
}

module.exports.login_get = (req, res) => {
    res.render('login'); // render the login page
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body; // destructure object containing these two properties

    try {
        const user = await User.create({ email, password }); // create() is async, so this whole function must be async

        // log in user after making account
        const token = createToken(user._id); // pass in the id of new user object
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); // use cookieparser method and pass in the new token

        // use .json() to send back a json object
        res.status(201).json({ user: user._id }); // send json version of newly saved user
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors}); // send errors back as json
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body; // destructure object containing these two properties
    
    try {
        const user = await User.login(email, password); // call static login function from user model
        
        // at this point, the user should be correct; if it wasn't, we would be in the catch statement by now because we threw errors
        const token = createToken(user._id); // make user token
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 }); // create jwt with token
        res.status(200).json({ user: user._id });
    } 
    catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({errors});
    }
}
