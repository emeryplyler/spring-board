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
