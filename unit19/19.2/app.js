const express = require('express');

// three routes, /mean /median /mode  , accepting GET requests
// each route takes a query key of 'nums', comma separated list
// example
// /mean?nums=1,3,5,7
// response should be a json
// response: {
//   operation: "mean",
//   value: 4
// }
// invalid inputs should return 400 bad request
// empty input should also return 400 bad request

// create instance of express app
const app = express();

// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    // res.send('<p>home page</p>');
    // by default, express looks for absolute path
    // pass another argument, the options object
    // specify what the root of the path is
    // __dirname is just the current folder that this file is in
    res.sendFile('./views/index.html', { root: __dirname });
});

function validateNumbers(queryString) {
    if (!queryString) return "blank";

    let numbers = queryString.split(",");
    for (i in numbers) {
        if (isNaN(numbers[i])) {
            return ["invalid", numbers[i]];
        } else {
            numbers[i] = parseInt(numbers[i]);
        }
    }

    return numbers;
}

app.get('/mean', (req, res) => {
    let meanRes = {
        operation: "mean",
        result: null
    };
    let numbers;
    if (!req.query.nums) {
        res.status(400).send({
            message: "Blank input: please enter some numbers."
        });
        return;
    } else {
        numbers = req.query.nums.split(",");
        for (i in numbers) {
            if (isNaN(numbers[i])) {
                res.status(400).send({
                    message: `Bad input: ${numbers[i]} is not a valid number.`
                });
                return;
            } else {
                numbers[i] = parseInt(numbers[i]);
            }
        }
    }
    // calculate mean
    let sum = numbers.reduce((prevNum, curNum) => prevNum + curNum, 0);
    let mean = sum / numbers.length;
    meanRes.result = mean;
    res.status(200).send(meanRes);
});

// median
app.get('/median', (req, res) => {
    let state = validateNumbers(req.query.nums);
    if (state === "blank") {
        res.status(400).send({
            message: "Blank input: please enter some numbers."
        });
    } else if (state[0] === "invalid") {
        res.status(400).send({
            message: `Bad input: ${state[1]} is not a valid number.`
        });
    } else {
        let median = {
            operation: "median",
            result: null
        }
        // sort numbers from least to greatest
        state.sort((a, b) => a - b);
        if (state.length % 2 != 0) {
            // odd number of items, return the one in the middle
            median.result = state[(state.length - 1) / 2];
        } else {
            // even number of items; average the two in the middle
            let index1 = state.length / 2;
            let index2 = index1 - 1;
            let middle1 = state[index1];
            let middle2 = state[index2];
            median.result = (middle1 + middle2) / 2;
        }

        res.status(200).send(median);
    }
});

// the 404 page just needs to be at the bottom;
// express reads from top to bottom looking for responses
// if a response is sent, it stops reading
// this code will only be reached if the request didn't matched anything else
// use() will fire off for every request, it's not scoped to a certain url
app.use((req, res) => {
    // res.send("<p>404: oops, not found</p>");

    // set status to actually be 404
    res.status(404).send("<p>404: oops, not found</p>");
})
