const express = require("express");
const { connectToDb, getDb } = require("./db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// middleware
app.use(express.json());

// database connection
let db;
connectToDb(err => {
    // callback function for after connection attempt
    if (!err) {
        // success
        app.listen(process.env.PORT, () => {
            console.log("App listening on port " + process.env.PORT);
        });
        db = getDb(); // set db to database connection to use later
    } else {
        // failure; print error, if it exists
        console.log(err);
    }
});

// routes

// user routes
app.use(authRoutes);

// dog registration
// dog adoption
// dog remove
// get user-registered dogs (filtering by status) (pagination)
// get user's adopted dogs (pagination)

// app.get("/");
