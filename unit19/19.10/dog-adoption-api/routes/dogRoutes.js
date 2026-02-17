// routes relating to user authorization
const { Router } = require("express");
const dogController = require("../controllers/dogController");
const { requireAuth, checkOwner } = require("../middlewares/authMiddleware");

const router = Router();

// register new dog (requires auth)
router.post("/dogs", requireAuth, dogController.register);
// view all dogs
router.get("/dogs", dogController.get_all);
// adopt dog by id (requires auth)
router.patch("/dogs/:id", requireAuth, dogController.adopt)
// delete a dog (requires auth) (requires register)
router.delete("/dogs/:id", requireAuth, dogController.delete);

module.exports = router;
