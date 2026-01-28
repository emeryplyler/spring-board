const express = require("express");
const blogController = require("../controllers/blogController"); // file containing route logic

// create router, attach handlers to router, then export router for app to use

// make new router object
const router = express.Router();

// pass in controller function as argument (NOT FUNCTION CALL!)
router.get("/", blogController.blog_index);

// show form to make new blog
router.get("/create", blogController.blog_create_get);

// handle post requests
// note: the url here is / and not /create because in the create.ejs file we specify that action=/blogs
router.post("/", blogController.blog_create_post);

// note: any routes with /blogs/* need to be above this point
// otherwise, the * will be interpreted as a blog id

// handle get requests for a specific blog
router.get("/:blogid", blogController.blog_details);

// handle delete requests for a specific blog
router.delete("/:blogid", blogController.blog_delete);

module.exports = router;
