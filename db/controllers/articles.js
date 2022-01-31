import db from '../../db/index.js';

// get all public / private articles, and get all user articles

export default async function getAllArticles(){
  try {
    var queryString = 'select * from Articles';
    const results = await db.promise().query(queryString);
    return results[0];
  } catch (error) {
    return error;
  }
}