import db from '../../db/index.js';

// get all public / private articles, and get all user articles

const getAllCommunityArticles = async () => {
  try {
    var queryString = 'select * from Articles where public = ? and deleted = ?';
    var params = [true, false];
    const results = await db.promise().query(queryString, params);
    return results[0];
  } catch (error) {
    return error;
  }
};

const getUserArticles = async (userID) => {
  try {
    var queryString = `select * from articles WHERE user_id = ${userID} and deleted = ${false}`;
    const results = await db.promise().query(queryString);
    return results[0];
  } catch (error) {
    return error;
  }
};

//POST: add a new article

const postNewArticles = async ({
  user_id,
  url,
  title,
  date_written,
  date_uploaded,
  Public,
  publication,
  text,
  userUploaded,
}) => {
  try {
    var queryString = `INSERT INTO articles (user_id,url,title,date_written,date_uploaded,public, publication, text, userUploaded) VALUES (?,?,?,?,?,?,?,?,?)`;
    const params = [
      user_id,
      url,
      title,
      date_written,
      date_uploaded,
      Public,
      publication,
      text,
      userUploaded,
    ];
    const results = await db.promise().query(queryString, params);
    return results[0];
  } catch (error) {
    return error;
  }
};

const postNewWord = async ({
  user_id,
  article_id,
  word,
  definition,
  language,
  translation,
  sentences,
}) => {
  try {
    var queryString1 = `INSERT INTO vocab (user_id,article_id, word, definition) VALUES
    (${user_id}, ${article_id},'${word.toLowerCase()}','${definition}')`;
    const result1 = await db.promise().query(queryString1);
    const lastVocabID = await db
      .promise()
      .query(`SELECT id from vocab ORDER BY id DESC LIMIT 1`);
    var queryString2 = `INSERT INTO translations (word_id,language, translation) VALUES (${lastVocabID[0][0].id}, '${language}','${translation}')`;
    var queryString3 = `INSERT INTO sentences (sentence, vocab_id, article_id) VALUES ('${sentences}', ${lastVocabID[0][0].id}, ${article_id})`;
    const result2 = await db.promise().query(queryString2);
    const result3 = await db.promise().query(queryString3);
    return result1[0];
  } catch (error) {
    return error;
  }
};

//POST or PUT: add a new word with the translations and the sentences

const checkExistence = async ({
  user_id,
  article_id,
  word,
  definition,
  language,
  translation,
  sentences,
}) => {
  let checkVocab = await db
    .promise()
    .query(
      `select word from vocab where word='${word}' AND user_id=${user_id}`
    );

  if (!checkVocab[0][0]) {
    return postNewWord({
      user_id,
      article_id,
      word,
      definition,
      language,
      translation,
      sentences,
    });
  } else {
    let checkTranslation = await db
      .promise()
      .query(
        `select translation from translations where language='${language}' AND translation='${translation}'`
      );
    if (!checkTranslation[0][0]) {
      const VocabID = await db
        .promise()
        .query(
          `SELECT id from vocab where word = '${word}' AND user_id=${user_id}`
        );
      var queryString2 = `INSERT INTO translations (word_id,language, translation) VALUES (${VocabID[0][0].id}, '${language}','${translation}')`;
      var queryString3 = `INSERT INTO sentences (sentence, vocab_id, article_id) VALUES ('${sentences}', ${VocabID[0][0].id}, ${article_id})`;
      const result2 = await db.promise().query(queryString2);
      const result3 = await db.promise().query(queryString3);
      return result2;
    } else {
      return 'this word already exists';
    }
  }
};

const deleteArticle = async ({ user_id, title, id }) => {
  try {
    var queryString =
      'UPDATE articles SET deleted = ? where articles.user_id = ? and articles.title = ?';
    var params = [1, user_id, title];
    const results = await db.promise().query(queryString, params);
    return results[0];
  } catch (error) {
    return error;
  }
};

const deleteWord = async ({ user_id, word_id }) => {
  try {
    var queryString =
      'UPDATE vocab SET deleted = ? WHERE vocab.user_id = ? AND vocab.id = ?';
    var params = [true, user_id, word_id];
    const results = await db.promise().query(queryString, params);
    return results[0];
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllCommunityArticles: getAllCommunityArticles,
  getUserArticles: getUserArticles,
  postNewArticles,
  postNewWord,
  checkExistence,
  deleteArticle,
  deleteWord,
};
