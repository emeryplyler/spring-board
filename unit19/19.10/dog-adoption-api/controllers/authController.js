// Controller for routes relating to authorization
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config({ quiet: true });


// error handling
const handleErrors = (err) => {
    console.log(err.message, err.code); // print to console
    let errors = { email: "", password: "" }; // initially, no issues

    // email is already registered
    if (err.code === 11000) {
        errors.email = "That email is already registered";
        return errors; // return right away since this error means user can't log in
    }

    // incorrect email on login
    if (err.message === "incorrect email") {
        // this comes from the User model's static method
        errors.email = "No user with that email was found";
    }

    // incorrect password on login
    if (err.message === "incorrect password") {
        errors.password = "Password is incorrect";
    }

    // validation errors
    if (err.message.includes("user validation failed")) {
        // check each error in the err.errors array
        // destructure each, retrieve only the properties
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message; // key is same as properties.path
        });
    }

    return errors;
};


// json web token maker
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 3 * 24 * 60 * 60 });
};


// user registration
module.exports.signup = async (req, res) => {
    const { email, password } = req.body; // retrieve info from request body

    try {
        // call mongoose method create()
        const user = await User.create({ email, password }); // pass email in email field, password in password field
        const token = createToken(user._id); // create token based on user's id
        res.cookie("jwt", token, { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true }); // keep token as cookie

        res.status(201).json({ user: user._id }); // send back new user's id
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors }); // send back errors
    }
};


// user login
module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password); // call static method from User model to log in
        const token = createToken(user._id);
        res.cookie("jwt", token, { maxAge: 3 * 24 * 60 * 60 * 1000, httpOnly: true });
        res.status(200).json({ user: user._id });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};


// user logout
module.exports.logout = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 }); // reset cookie
};
