import db from '/Users/shuwenliang/Documents/BlueOcean/english/db/index.js';
//controller files

const getAllArticles = async () => {
  try {
    var queryString = 'select * from Articles';

    const result = await db.promise().query(queryString);
    // console.log('get data: ', result);
    return result[0];
  } catch (error) {
    // console.log(error);
    return error;
  }

  // var queryString = 'select * from Articles';

  // db.query(queryString,(err, res) => {
  //   if (err) {
  //     cb(err, null);
  //   } else {
  //     cb(null, res);
  //   }
  // });
};

export default getAllArticles;