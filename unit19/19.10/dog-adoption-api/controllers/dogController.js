const Dog = require("../models/Dog");
const User = require("../models/User");

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {};
    return err;
};

module.exports.register = async (req, res) => {
    const { name, breed, description, owner } = req.body;

    try {
        // try to insert into db
        const dog = await Dog.create({ name, breed, description, owner, registered_by: res.locals.user.id }); // registered by current user

        res.status(201).json({ dog: dog._id });
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors: errors });
    }
};

module.exports.get_all = async (req, res) => {
    // pagination
    const page = req.query.p || 0;
    const perPage = 20;

    try {
        // find(filter, projection, options)
        const found = await Dog.find({}, null, { skip: page * perPage, limit: perPage, sort: { "name": 1 } }); // get dogs on current calculated page, sort by name
        res.status(200).json(found);
    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};

module.exports.adopt = async (req, res) => {
    // try to find dog in db
    try {
        const found = await Dog.findOne({ _id: req.params.id });
        // is dog already adopted?
        const owner = await User.findOne({ _id: found.owner }); // try to verify dog's current owner; if fails, no current owner
        if (owner) {
            res.status(400).json({ message: "That dog has already been adopted" });
        } else {
            // set dog's owner to current user's id
            const result = await Dog.updateOne({ _id: req.params.id }, { owner: res.locals.user.id });
            const og_owner = await User.findById(found.registered_by) || null;
            let thanks = " " + og_owner.email;
            res.status(200).json({ message: "Thank you" + thanks + " for listing this dog!"});
        }


    } catch (error) {
        const errors = handleErrors(error);
        res.status(400).json({ errors });
    }
};

module.exports.delete = async (req, res) => {
    // dog id is passed through url params
    try {
        // is dog adopted?
        const dog = await Dog.findById(req.params.id);
        if (!dog.owner) {
            // compare registered_by and current user
            if (String(dog.registered_by) === res.locals.user.id) {
                const result = await Dog.deleteOne({ _id: req.params.id });
                res.status(200).json(result);
            } else {
                res.status(400).json({ message: "You can only remove dogs that you registered" });
            }
        } else {
            res.status(400).json({ message: "You can only remove dogs that haven't been adopted" });
        }

    } catch (error) {
        const errors = handleErrors(error);
        res.status(500).json({ errors });
    }
};

module.exports.get_registered = async (req, res) => {
    // pagination
    const page = req.query.p || 0;
    const perPage = 20;

    try {
        // query: find all where registered_by = user's id
        const found = await Dog.find({ registered_by: res.locals.user.id }, null, { skip: page * perPage, limit: perPage }); // skip to current page, show page amount
        res.status(200).json(found);

    } catch (error) {
        const errors = handleErrors(error);
        res.status(500).json({ errors });
    }
}

module.exports.get_adopts = async (req, res) => {
    const page = req.query.p || 0;
    const perPage = 20;

    try {
        // query: find all where owner = user's id
        const found = await Dog.find({ owner: res.locals.user.id }, null, { skip: page * perPage, limit: perPage });
        res.status(200).json(found);

    } catch (error) {
        const errors = handleErrors(error);
        res.status(500).json({ errors });
    }
}
