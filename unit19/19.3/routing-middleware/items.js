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
        // POST - adds to fakeDb array and returns items added
        // TODO - handle batch post requests?
        if (!req.body.name || !req.body.price) {
            res.status(400).send({ message: "Please enter a name and a price." });
        } else {
            try {
                let newItem = {};
                newItem.name = req.body.name;
                newItem.price = req.body.price;
                items.push(newItem);
                res.status(200).send({ added: req.body });
            }
            catch (err) {
                // counting this as server-side error, status 500
                res.status(500).send({ message: err });
            }
        }
    });

router
    .route("/:name")
    .get((req, res) => {
        // GET (specific) - returns one item
        // use indexOf to find object in array where item.name = req.params.name
        let index = items.findIndex((element) => element.name === req.params.name);
        // if there are duplicates, this should only return the first item with that name
        if (index === -1) {
            // couldn't find that item
            res.status(404).send({
                message: "Couldn't find an item with the name " + req.params.name
            });
        } else {
            let item = items[index];
            res.status(200).send({
                name: item.name,
                price: item.price
            });
        }
    })
    .patch((req, res) => {
        // PATCH - update an item's information
        let index = items.findIndex((element) => element.name === req.params.name);
        if (index === -1) {
            // couldn't find that item
            res.status(404).send({
                message: "Couldn't find an item with the name " + req.params.name
            });
        } else {
            let item = items[index];
            if (req.body.name) item.name = req.body.name;
            if (req.body.price) item.price = req.body.price;
            res.status(200).send({
                updated: {
                    name: item.name,
                    price: item.price
                }
            });
        }
    })
    .delete((req, res) => {
        // DELETE - remove an item from the db
        let index = items.findIndex((element) => element.name === req.params.name);
        if (index === -1) {
            // couldn't find that item
            res.status(404).send({
                message: "Couldn't find an item with the name " + req.params.name
            });
        } else {
            try {
                items.splice(index, 1);
                res.status(200).send({
                    message: "Deleted"
                });
            } catch (err) {
                res.status(500).send({
                    message: `Couldn't delete that item: ${err}`
                });
            }
        }
    });
