import db from '../../db/index.js';

const updateVocablist = async ({ currentInterval, repetition, efactor, id}) => {
  try {
    var queryString = 'UPDATE vocab set currentInterval = ?, repetition = ?, efactor = ? where id = ?';
    var params = [currentInterval, repetition, efactor, id];
    const results = await db.promise().query(queryString, params);
    return results[0];
  } catch (error) {
    return error;
  }
}

const getVocabListAlphabetically = async () => {
  try {
    //send translations and sentences
    var queryString = 'SELECT * FROM vocab ORDER BY word asc';
    const results = await db.promise().query(queryString);
    return results[0];
  } catch (error) {
    return error;
  }
}

const getVocalListCurrentInterval = async () => {
  //sort by CurrentInterval from lower to higher
  //send translations and sentences
  try {
    var queryString = 'SELECT * from vocab ORDER BY currentInterval ASC';
    const results = await db.promise().query(queryString);
    return results[0];
  } catch (error) {
    return error;
  }
}

module.exports = {
  updateVocablist,
  getVocabListAlphabetically,
  getVocalListCurrentInterval
};

/*

- put request (body) updating a flash card
  - currentInterval : nextInterval,
  - repitition: nextRepetition,
  - efactor: nextEfactor,
  - word: word,
  - wordID: wordID

- get request for flashcards ()
  - userId,word, currentInterval, repitition, efactor,
  - sorted by currentInterval, ASCENDING

  - get request vocab list ()
    - sorted by alphabetical order A -> Z
    - get all vocab of a specific language for a user
*/