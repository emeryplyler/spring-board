const { MongoClient } = require("mongodb");

let dbConnection; // initialize db connection variable in broad scope

// connecting to db
module.exports = {
    connectToDb: () => {
        // connection string
        MongoClient.connect("mongodb://localhost:27017/bookstore")
            .then((client) => {
                dbConnection = client.db(); // set db connection
            })
            .catch(err => {
                console.log(err);
            });
    },
    getDb: () => dbConnection // return db connection (implicit return)
};
