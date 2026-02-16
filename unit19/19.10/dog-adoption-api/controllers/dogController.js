const Dog = require("../models/Dog");

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = {};
    return err;
};

module.exports.register = async (req, res) => {
    const { name, breed, description } = req.body;

    try {
        // try to insert into db
        const dog = await Dog.create({ name, breed, description });

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

module.exports.delete = async (req, res) => {
    // dog id is passed through url params
    try {
        // compare dog owner id and user id
        const result = await Dog.deleteOne({ _id: req.params.id });
        res.status(200).json(result);
    } catch (error) {
        const errors = handleErrors(error);
        res.status(500).json({ errors });
    }
};
