const express = require("express");
const { connectToDb } = require("./db");
const authRoutes = require("./routes/authRoutes");
const dogRoutes = require("./routes/dogRoutes");

const app = express();

// middleware
app.use(express.json());

// database connection
connectToDb(app);

// routes

// user routes
app.use(authRoutes);

// dog routes
app.use(dogRoutes)

// get user-registered dogs (filtering by status) (pagination)
// get user's adopted dogs (pagination)

// app.get("/");
