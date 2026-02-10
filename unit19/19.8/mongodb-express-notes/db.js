const { MongoClient } = require("mongodb");
require("dotenv").config({ quiet: true });

let dbConnection; // initialize db connection variable in broad scope

// connecting to db
module.exports = {
    connectToDb: (callback) => {
        // connection string
        MongoClient.connect(process.env.MONGO_URI)
            .then((client) => {
                dbConnection = client.db(); // set db connection
                return callback(); // the function that is called right after the connection attempt
            })
            .catch(err => {
                console.log(err);
                return callback(err); // pass the error to the callback function for error handling
            });
    },
    getDb: () => dbConnection // return db connection (implicit return)
};
