const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config({quiet: true});
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middleware/authMiddleware");

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.connect(process.env.MONGO_URI)
  .then((result) => app.listen(3001))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', requireAuth, (req, res) => res.render('smoothies'));
app.use(authRoutes); // add in all the routes from authRoutes.js
