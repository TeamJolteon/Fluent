import db from '../../db/index.js';

// get all public / private articles, and get all user articles

const getAllArticles = async () => {
  try {
    var queryString = 'select * from Articles';
    const results = await db.promise().query(queryString);
    return results[0];
  } catch (error) {
    return error;
  }
}

const getUserArticles = async (userID) => {
  try {
    var queryString = `select * from Articles WHERE user_id = ${userID}`;
    // var params = [userID];
    const results = await db.promise().query(queryString);
    return results[0];
  } catch (error) {
    return error;
  }
}


module.exports = {
  getAllArticles: getAllArticles,
  getUserArticles: getUserArticles
}