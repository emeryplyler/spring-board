// Create and export a router to handle all routes related to authorization
const { Router } = require("express");

// import controller functions that handle the route logic
const authController = require("../controllers/authController");

const router = Router();

router.get("/signup", authController.signup_get);
router.post("/signup", authController.signup_post);
router.get("/login", authController.login_get);
router.post("/login", authController.login_post);

module.exports = router;
