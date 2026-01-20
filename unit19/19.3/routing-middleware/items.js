const express = require("express");
let router = express.Router();

module.exports = router; // export router; may not be necessary

const items = require("./fakeDb");

// base path = "/items"

router
    .route("/")
    .get((req, res) => {
        // GET - returns all items
        res.status(200).send(items);
    })
    .post((req, res) => {
        // console.log(req.body);
        if (!req.body.name || !req.body.price) {
            res.status(400).send({message: "Please enter a name and a price."});
        } else {
            try {
                let newItem = {};
                newItem.name = req.body.name;
                newItem.price = req.body.price;
                items.push(newItem);
                res.status(200).send({added: req.body});
            }
            catch (err) {
                // counting this as server-side error, status 500
                res.status(500).send({message: err});
            }
        }
        
    })
