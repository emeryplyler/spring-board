// simple example

axios.get("https://catfact.ninja/fact").then((response) => {
    console.log(response); // log entire object
}).catch((r) => console.error(`${r}`));

// notes: this one seems to be on a new website and now needs you to buy an api key
axios.get("https://api.coindesk.com/v1/bpi/currentprice.json").then((response) => {
    console.log(response);
}).catch((r) => console.error(`${r}`));

axios.get("https://api.genderize.io?name=pat").then((response) => {
    console.log(`Name: ${response.data.name}, predicted gender: ${response.data.gender}, with a ${(response.data.probability * 100).toFixed(2)}% chance`);
    console.log(`We've seen this name ${response.data.count} times`);
}).catch((r) => console.error(`${r}`));
