const jwt = require("jsonwebtoken");
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
        })

    } else {
        // no token, not logged in; redirect to login page
        res.redirect("/login");
    }

    // next();
}

module.exports = { requireAuth };
