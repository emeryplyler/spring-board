const fs = require('fs');
const process = require('process');
const axios = require('axios');

// read file and print contents

function cat(path, out, output) {
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(`Couldn't read file at ${path}; ${err}`);
            process.exit(1); // exit with error code
        }
        else {
            if (out) {
                fs.writeFile(output, data.toString(), (err) => {
                    console.log(`Couldn't write to file at ${output}; ${err}`);
                }); // use callback function to print error message
            } else {
                console.log(data.toString()); // convert data to string and print
            }
        }
    });
}

async function webCat(url, out, output) {
    try {
        const res = await axios.get(url);
        const dat = res.data.slice(0, 500) + "..."; // limit to 500 characters to not clog terminal
        if (out) {
            fs.writeFile(output, dat, (err) => {
                console.log(`Couldn't write to file at ${output}; ${err}`);
            });
        } else {
            console.log(dat);
        }
    }
    catch (err) {
        console.log(`Couldn't read site at ${url}; ${err}`);
        process.exit(1);
    }
}

// do a simple check to see if the argument starts with 'http'; if so, it's a url
if (process.argv.length > 2) {
    let out = false;
    let readPath = process.argv[2];
    let writePath = '';

    if (process.argv[2] === "--out") {
        // output to file at process.argv[2], read from process.argv[3]
        out = true;
        readPath = process.argv[4];
        writePath = process.argv[3];
    }

    if (readPath.slice(0, 4) == "http") {
        webCat(readPath, out, writePath);
    } else {
        cat(readPath, out, writePath);
    }
}
