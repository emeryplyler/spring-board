// Replace this file with custom middleware functions, including authentication and rate limiting

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Dog = require("../models/Dog");
require("dotenv").config({ quiet: true });

const requireAuth = (req, res, next) => {
    // since middleware, call next function at end; this function gets called between two other functions
    // retrieve jwt from user's cookies
    const token = req.cookies.jwt;

    if (token) {
        // verify token using secret
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                // couldn't verify token; don't continue
                res.status(400).json({ message: "Couldn't verify user. Please log in" });
            } else {
                next(); // continue on
            }
        });

    } else {
        // no token; don't continue
        res.status(400).json({ message: "Couldn't verify user. Please log in" });
    }
};

const checkOwner = (req, res, next) => {
    // this is meant to be called after requireAuth; assume user is logged in
    const token = req.cookies.jwt;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
            // for some reason, couldn't verify token
            res.status(400).json({ message: "Couldn't verify user. Please log in" });
        } else {
            let user = await User.findById(decodedToken.id); // retrieve id from token creation function signing, find user corresponding
            // check user id against dog owner_id
            try {
                let dog = await Dog.findById(req.params.id);
                if (dog.owner === user._id) {
                    // verified dog's owner; continue
                    next();
                } else {
                    // not owner
                    res.status(400).json({ message: "You must be the dog's owner to delete it" });
                }

            } catch (error) {
                res.status(400).json({ message: "Couldn't verify dog's owner. Can't delete " });
            }

        }
    });
};

module.exports = { requireAuth, checkOwner };
