// routes relating to user authorization
const { Router } = require("express");
const dogController = require("../controllers/dogController");
const { requireAuth, checkOwner } = require("../middlewares/authMiddleware");

const router = Router();

// register new dog (requires auth)
router.post("/dogs", requireAuth, dogController.register);
// view all dogs
router.get("/dogs", dogController.get_all);
// delete a dog (requires auth) (requires ownership)
router.delete("/dogs/:id", requireAuth, checkOwner, dogController.delete);

module.exports = router;
