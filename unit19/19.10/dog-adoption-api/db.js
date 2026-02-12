const { MongoClient } = require("mongodb");
require("dotenv").config({ quiet: true });

let dbConnection;

module.exports = {
    connectToDb: (callback) => {
        MongoClient.connect(process.env.MONGODB_URI)
            .then((client) => {
                dbConnection = client.db(); // set db connection
                return callback(); // return and call the callback function
            })
            .catch(err => {
                console.log(err);
                return callback(err); // return and call callback while passing in err
            });
    },
    getDb: () => dbConnection // getter function for db connection
};
