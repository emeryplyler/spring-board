const express = require('express');

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

app.get('/about', (req, res) => {
    res.send('<p>about page</p>');
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
