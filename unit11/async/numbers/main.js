let numbersAPI = "http://numbersapi.com";
const favNum = 9;

// 1: my favorite number
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
getNumberFacts(favNum);

// 2: multiple numbers in a batch request
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

// 3: four facts about my favorite number
function getMoreFacts(howMany, num)
{
    // NumbersAPI doesn't have an easier way to get multiple facts about the same number the way it does one fact about multiple numbers
    // make four or so requests about 'num'
    for (let i = 0; i < 4; i++)
    {
        getNumberFacts(num);
    }
}
getMoreFacts(4, favNum);

// // retrieve json
// fetch(numbersAPI)
//     // arrows: it goes (arg1, arg2, etc.) => mathOrDataStuff(arg1 + arg2)
//     // if there's only one argument, you dont even need ()
//     .then((data) => data.json()) // just print data for now
//     .then(json => console.log(json)) // the output of the previous .then becomes input
//     .catch(err => console.error(err));