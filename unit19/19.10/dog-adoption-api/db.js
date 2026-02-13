const mongoose = require("mongoose");
require("dotenv").config({ quiet: true });


module.exports.connectToDb = (app) => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            app.listen(process.env.PORT);
            console.log("App listening on port " + process.env.PORT);
        })
        .catch(err => console.log(err));
};
