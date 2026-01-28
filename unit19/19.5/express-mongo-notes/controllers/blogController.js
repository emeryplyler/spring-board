const Blog = require("../models/blog");
// logic for all blog crud operations

// get all
const blog_index = (req, res) => {
    // use ejs to render a view
    // express will look for 'index' in the views folder
    Blog.find() // since Blog is attached to the 'blogs' collection, it will find all blogs
        .then((result) => {
            // instead of res.send, render a view instead
            // render index.ejs and pass in an object holding data
            // because the property name and value name are the same, you can just write 'blogs'
            res.render('blogs/index', { title: "Blogs", blogs: result }); // second parameter is the data object that will be sent to the ejs file
        })
        .catch((err) => {
            console.log(err);
        });
}

const blog_details = (req, res) => {
    const id = req.params.blogid;
    Blog.findById(id)
        .then((result) => {
            res.render("blogs/details", { blog: result, title: "Blog Details" });
        })
        .catch((err) => {
            console.log(err)
        });
}

const blog_create_get = (req, res) => {
    res.render("blogs/create", { title: "New Blog" });
}

const blog_create_post = (req, res) => {
    // make a new instance of Blog document
    const newBlog = new Blog(req.body); // can just pass object directly into constructor
    // call the save() method of the model
    // this will save it to the collection (async)
    newBlog.save()
        .then((result) => {
            // note: the path here needs to be the absolute path, not the relative one like the router "/create" string that actually means "/blogs/create"
            res.redirect("/blogs"); // send back to blogs page
        })
        .catch((err) => {
            console.log(err);
        });
}

const blog_delete = (req, res) => {
    const id = req.params.blogid;
    Blog.findByIdAndDelete(id)
        .then(result => {
            // when doing ajax requests you can't redirect the same way
            res.json({ redirect: '/blogs' }); // we pass a json with a redirect property
        })
        .catch(err => {
            console.log(err);
        });
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}
