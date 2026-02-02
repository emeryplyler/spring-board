const User = require("../models/User"); // import user model

// error handling function
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: "", password: "" };

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
        // use .json() to send back a json object
        res.status(201).json(user); // send json version of newly saved user
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors}); // send errors back as json
    }
}

module.exports.login_post = async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body; // destructure object containing these two properties
    console.log(email, password);
    res.send("user login");
}
