const express = require("express");
const app = express();

const itemRoutes = require("./items");

// use json
app.use(express.json());

app.use("/items", itemRoutes); // handle requests through items.js

app.get("/", (req, res) => {
    res.send("Homepage");
});

app.listen(3000);
