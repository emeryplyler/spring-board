const express = require('express');
const mongoose = require('mongoose');

app = express();

const mongoURI = "mongodb+srv://emery:SWtChvnKxXCpal1J@cluster0.lybzmpo.mongodb.net/?appName=Cluster0";
mongoose.connect(mongoURI)
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));

app.get("/", (req, res) => {
    res.status(200).send("<p>Homepage</p>");
})

app.listen(3000);
