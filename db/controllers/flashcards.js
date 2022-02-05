import db from '../../db/index.js';

const updateVocablist = async ({
  currentInterval,
  repetition,
  efactor,
  id,
}) => {
  try {
    var queryString =
      'UPDATE vocab set currentInterval = ?, repetition = ?, efactor = ? where id = ?';
    var params = [currentInterval, repetition, efactor, id];
    const results = await db.promise().query(queryString, params);
    return results[0];
  } catch (error) {
    return error;
  }
};

const getVocabListAlphabetically = async (language, userID) => {
  try {
    var queryString = `SELECT v.*, t.language, t.translation, s.sentence, a.url
    from vocab v
    LEFT JOIN translations t ON t.word_id = v.id
    LEFT JOIN sentences s ON s.vocab_id = v.id
    LEFT JOIN articles a ON a.id = v.article_id
    WHERE t.language = '${language}' AND v.user_id=${userID} AND v.deleted = 0
    ORDER BY v.word ASC`;
    const results = await db.promise().query(queryString);
    return results[0];
  } catch (error) {
    return error;
  }
};

const getVocalListCurrentInterval = async (language, userID) => {
  try {
    var queryString = `SELECT v.*, t.language, t.translation, s.sentence, a.url
    from vocab v
    LEFT JOIN translations t ON t.word_id = v.id
    LEFT JOIN sentences s ON s.vocab_id = v.id
    LEFT JOIN articles a ON a.id = v.article_id
    WHERE t.language = '${language}' AND v.user_id=${userID} AND v.deleted = 0
    ORDER BY v.currentInterval ASC`;
    const results = await db.promise().query(queryString);
    return results[0];
  } catch (error) {
    return error;
  }
};

module.exports = {
  updateVocablist,
  getVocabListAlphabetically,
  getVocalListCurrentInterval,
};
