const fs = require('fs');

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

cat(process.argv[2]); // call cat() using the argument right after the file name in the terminal
