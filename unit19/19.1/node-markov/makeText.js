/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const markov = require('./markov');

function markovFile(path) {
    text = "";
    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(`Couldn't read from file at ${path}: ${err}`);
            process.exit(1);
        } else {
            text = data.toString();
            let mm = new markov.MarkovMachine(text);
            mm.makeText();
        }
    })
}

async function markovUrl(url) {
    text = "";
    let response;
    try {
        response = await axios.get(url);
        console.log(response.data);
    } catch (err) {
        console.log(`Couldn't fetch from ${url}: ${err}`);
        process.exit(1);
    }
    let mm = new markov.MarkovMachine(response.data);
    mm.makeText();
}

// depending on if argument 2 is 'file' or 'url', call different function

if (process.argv[2] === "file") {
    markovFile(process.argv[3]);
} else if (process.argv[2] === "url") {
    markovUrl(process.argv[3]);
}


