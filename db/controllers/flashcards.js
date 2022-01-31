const db = require('../index.js');

/*

- put request (body)
  - currentInterval : nextInterval,
  - repitition: nextRepetition,
  - efactor: nextEfactor,
  - word: word,
  - wordID: wordID
- get request
  - userId,word, currentInterval, repitition, efactor,
  - sorted by currentInterval, ASCENDING
*/