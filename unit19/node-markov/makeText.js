/** Command-line tool to generate Markov text. */

// input:  $ node makeText.js file eggs.txt
// output: ... generated text from file 'eggs.txt' ...
//         ghjfhgjkdjfh dhfjh  dhkjf t etc.

const fs = require('fs');
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

markovFile(process.argv[3]);
