// routes relating to user authorization
const { Router } = require("express");

const authController = require("../controllers/authController");

const router = Router();

// user registration
router.post("/signup", authController.signup); // attach corresponding controller methods to routes
// user login
router.post("/login", authController.login);

module.exports = router;
