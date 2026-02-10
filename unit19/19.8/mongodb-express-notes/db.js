const { MongoClient } = require("mongodb");

let dbConnection; // initialize db connection variable in broad scope

// connecting to db
module.exports = {
    connectToDb: (callback) => {
        // connection string
        MongoClient.connect("mongodb://localhost:27017/bookstore")
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
