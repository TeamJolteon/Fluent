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

const getVocabListAlphabetically = async (language, userID) => {
  try {
    //send translations and sentences
    var queryString =
    `SELECT v.*, t.language, t.translation, s.sentence
    from vocab v
    LEFT JOIN translations t ON t.word_id = v.id
    LEFT JOIN sentences s ON s.vocab_id = v.id
    WHERE t.language = '${language}' AND v.user_id=${userID}
    ORDER BY v.word ASC`;

    const results = await db.promise().query(queryString);
    return results[0];
  } catch (error) {
    return error;
  }
}

const getVocalListCurrentInterval = async (language, userID) => {
  try {
    var queryString =
    `SELECT v.*, t.language, t.translation, s.sentence
    from vocab v
    LEFT JOIN translations t ON t.word_id = v.id
    LEFT JOIN sentences s ON s.vocab_id = v.id
    WHERE t.language = '${language}' AND v.user_id=${userID}
    ORDER BY v.currentInterval ASC`;

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