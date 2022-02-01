import db from '../db/index.js';
//controller files

const getAllArticles = async () => {
  try {
    var queryString = 'select * from Articles';
    const result = await db.promise().query(queryString);
    return result[0];
  } catch (error) {
    return error;
  }
};

export default getAllArticles;