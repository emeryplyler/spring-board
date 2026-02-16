// routes relating to user authorization
const { Router } = require("express");

const dogController = require("../controllers/dogController");

const router = Router();

// register new dog
router.post("/dogs", dogController.register);
// view all dogs
router.get("/dogs", dogController.get_all);
// delete a dog
router.delete("/dogs/:id", dogController.delete);

module.exports = router;
