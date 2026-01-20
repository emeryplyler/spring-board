const express = require('express');

// create instance of express app
const app = express();

// listen for requests
app.listen(3000);

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

// mean
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

// mode
app.get('/mode', (req, res) => {
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
        let mode = {
            operation: "mode",
            result: null
        }
        // how many times does each item appear?
        state.sort((a, b) => a - b); // first, sort from least to greatest

        const freqMap = {};
        state.forEach(number => {
            // if number is already in freqmap, it adds 1 to number's count
            // if number is not in freqmap, the expression returns 0 and the number is added to freqmap with a count of 1
            freqMap[number] = (freqMap[number] || 0) + 1;
        });

        let modes = [];
        let maxFreq = 0;

        for (const num in freqMap) {
            const freq = freqMap[num]; // grab value using key
            if (freq > maxFreq) {
                maxFreq = freq;
                modes = [parseInt(num)];
            } else if (freq === maxFreq) {
                // equal frequency; this is also a mode
                modes.push(parseInt(num));
            }
        }

        mode.result = modes;

        res.status(200).send(mode);
    }
});
