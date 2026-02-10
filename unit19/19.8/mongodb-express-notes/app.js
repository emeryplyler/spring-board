const express = require("express");
const { ObjectId } = require("mongodb");
const { connectToDb, getDb } = require("./db");

// init app
const app = express();

// middleware
app.use(express.json()); // allows us to get body of json requests

// connect to db
let db;
connectToDb((err) => {
    // function to be called right after connection attempt
    // err is only passed if there was an error
    if (!err) {
        // success; start listening
        app.listen(3001, () => {
            console.log("App listening on port 3001");
        });
        db = getDb(); // returns database connection, which was retrieved on calling connectToDb
    }
});


// routes

// get many
app.get("/books", (req, res) => {
    let books = [];

    db.collection("books")
        .find() // returns a cursor pointing to a set of documents; with no arguments, points to entire collection
        // note; mongodb fetches documents in little batches of 100 or so
        .sort({ author: 1 }) // sort by author name
        .forEach(book => books.push(book)) // add all books in batch to the array
        .then(() => {
            res.status(200).json(books);
        })
        .catch(() => { res.status(500).json({ error: "couldn't fetch documents" }); });
});

// get one
app.get("/books/:id", (req, res) => {
    // validate id format
    if (ObjectId.isValid(req.params.id)) {
        // valid id; check collection for corresponding book
        db.collection("books")
            .findOne({ _id: new ObjectId(req.params.id) }) // convert route params into ObjectId, filter by _id
            .then(doc => {
                res.status(200).json(doc); // send in the doc object returned by findOne()
            })
            .catch(err => {
                res.status(500).json({ message: "Couldn't fetch that document" });
            });
    } else {
        // object id was not valid; don't bother checking collection
        res.status(500).json({ error: "Not a valid document ID" });
    }
});

// post
app.post("/books", (req, res) => {
    // get body of request (book information)
    const book = req.body;

    // add document to db
    db.collection("books")
        .insertOne(book)
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({ message: "Couldn't create new document" });
        });
});

// DELETE
app.delete("/books/:id", (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        // valid id; check collection for corresponding book
        db.collection("books")
            .deleteOne({ _id: new ObjectId(req.params.id) }) // convert route params into ObjectId, filter by _id
            .then(result => {
                res.status(200).json(result); // send delete result to client
            })
            .catch(err => {
                res.status(500).json({ message: "Couldn't delete that document" });
            });
    } else {
        // object id was not valid; don't bother checking collection
        res.status(500).json({ error: "Not a valid document ID" });
    }
});
