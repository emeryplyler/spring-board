const fs = require('fs');
const process = require('process');
const axios = require('axios');

// read file and print contents

function cat(path) {
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
            process.exit(1); // exit with error code
        }
        else {
            console.log(data.toString()); // convert data to string and print
        }

    });
}

async function webCat(url) {
    try {
        const res = await axios.get(url);
        console.log(res.data.slice(0, 500) + "..."); // limit to 500 characters to not clog terminal
    }
    catch (err) {
        console.log(err.cause); // print just the cause property to not clog terminal with long error
    }
}

// do a simple check to see if the argument starts with 'http'; if so, it's a url
if (process.argv.length > 2) {
    if (process.argv[2].slice(0, 4) == "http") {
        webCat(process.argv[2]);
    } else {
        cat(process.argv[2]);
    }
}
