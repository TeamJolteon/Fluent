const db = require('../index.js');

// const db = mysql({
//   config: {
//     host: 'localhost',
//     port: 3306,
//     database: 'volt',
//     user: 'root',
//     password: ''
//   }
// });


// get all public / private articles, and get all user articles

export default async function getAllArticles(){
  try {
    var query = 'select * from Articles';

    console.log('we got here 1');
    const results = await db.promise().query(query);
    console.log('we got here 2');

    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}

// var getUserArticles = async function({ query, values}) {
//   try {
//     const query = 'select * from articles where username = ?';
//     const results = await db.query(query, values);
//     await db.end();
//     return results;
//   } catch (error) {
//     return { error }
//   }
// }

// module.exports = {
//   getAllArticles: getArticles,
//   getUserArticles: getUserArticles
// }



