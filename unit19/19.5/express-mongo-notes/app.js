const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes'); // import router for all blog-related pages

app = express();

// register view engine
app.set('view engine', 'ejs'); // by default, looks for /views

// connect to db using .env variable
mongoose.connect(process.env.MONGO_URI)
    .then((result) => console.log('connected to db'))
    .catch((err) => console.log(err));

// middleware
app.use(express.urlencoded({ extended: true })); // passes url encoded data as an object

// static files
app.use(express.static("public"));

app.use("/blogs", blogRoutes); // activate the blogRoutes file

app.listen(3000);
