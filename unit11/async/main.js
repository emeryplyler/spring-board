let numbersAPI = "http://numbersapi.com";

function getNumberFacts(num)
{
    const numbersAPIUrl = numbersAPI.concat(`/${num}/trivia?json`); // add this to the end of url
    // retrieve json
    fetch(numbersAPIUrl)
        // arrows: it goes (arg1, arg2, etc.) => mathOrDataStuff(arg1 + arg2)
        // if there's only one argument, you dont even need ()
        .then((data) => data.json()) // just print data for now
        .then(json => console.log(json.text)) // the output of the previous .then becomes input
        .catch(err => console.error(err));
}
getNumberFacts(43);

function getNumberFactsBatch(arr)
{
    let numbersUrl = numbersAPI + "/";
    const batch = arr.join(); // convert all numbers in array to string, separated by commas
    numbersUrl += batch + "/trivia?json"; // add to end of url
    
    fetch(numbersUrl)
        .then((data) => data.json()) // convert data to javascript json object
        .then(json =>
        {
            for (let n in json) // using each item 'n' in json as a key,
            {
                console.log(json[n]); // print the value corresponding to 'n'
            }
        })
        .catch(err => console.error(err));
}
getNumberFactsBatch([4, 23, 2, 0, 14]);

// // retrieve json
// fetch(numbersAPI)
//     // arrows: it goes (arg1, arg2, etc.) => mathOrDataStuff(arg1 + arg2)
//     // if there's only one argument, you dont even need ()
//     .then((data) => data.json()) // just print data for now
//     .then(json => console.log(json)) // the output of the previous .then becomes input
//     .catch(err => console.error(err));