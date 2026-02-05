const jwt = require("jsonwebtoken");
const User = require("../models/User");
require('dotenv').config({ quiet: true });

const requireAuth = (req, res, next) => {
    // retrieve jwt from user's request cookies
    const token = req.cookies.jwt;

    if (token) {
        // verify token using secret
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                // couldn't verify token; redirect to login page
                console.log(err.message);
                res.redirect("/login");
            } else {
                console.log(decodedToken);
                next(); // continue
            }
        });

    } else {
        // no token, not logged in; redirect to login page
        res.redirect("/login");
    }
}

// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                // couldn't verify token
                console.log(err.message);
                res.locals.user = null; // initialize local, but set it to nothing because we don't have a username to display
                next(); // no user logged in; just don't do anything
            } else {
                // token verified, user is logged in
                console.log(decodedToken);
                // user's id is in decodedToken, because tokens are generated based on id
                let user = await User.findById(decodedToken.id);
                res.locals.user = user; // create a local to store user object, to pass into views
                next(); // continue
            }
        });
    } else {
        // user isn't logged in; don't do anything
        res.locals.user = null;
        next();
    }
}

module.exports = { requireAuth, checkUser };
