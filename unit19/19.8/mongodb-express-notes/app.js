const express = require("express");

// init app
const app = express();
app.listen(3000, () => {
    console.log("App listening on port 3000");
});

// middleware
// middleware goes here

// routes
app.get("/books", (req, res) => {
    res.json({ message: "Welcome to the API" });
});
