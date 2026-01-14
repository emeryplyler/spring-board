/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i++) {
      const word = this.words[i];
      if (this.words[i + 1]) {
        const nextWord = this.words[i + 1];
        // check if word is in map
        if (chains.has(word)) {
          // word is already in map; add nextWord to its array
          chains.get(word).push(nextWord);
        } else {
          // add word to map
          chains.set(word, [nextWord]); // initialize word's array
        }
      }
    }

    this.chains = chains; // create and set property
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    // randomly pick a starting word
    let currentWord = Array.from(this.chains.keys())[Math.floor(Math.random() * this.chains.size)];
    // make an empty string to store output
    let text = "";
    // while length < 100
    for (let i = 0; i < numWords; i++) {
      text += currentWord; // add the current word to the text
      let possibles = this.chains.get(currentWord);

      if (!possibles) {
        // no possible next words; end the text
        break;
      } else {
        text += " "; // put spaces between words but not at the end
      }

      let nextWord = possibles[Math.floor(Math.random() * possibles.length)];
      currentWord = nextWord;
    }
    // pick randomly from this.chains.get(currentWord)
    // append it to the string
    // now set that to be currentWord
    // loop

    console.log(text);
  }
}

export { MarkovMachine };
