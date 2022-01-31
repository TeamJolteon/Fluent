// const getAllArticles = require('../../db/controllers/articles.js');
import getAllArticles from '../../db/controllers/articles.js';



export default async function handler(req, res) {
  try {
    console.log('test: ', getAllArticles({ query: 'select * from Articles' }));
    var results = await getAllArticles({ query: 'select * from Articles' });
    // var results = 'hello there';
    res.status(200).json(results);
    console.log('we got here 3');
  } catch (error) {
    res.status(500)
    console.error('Failed to retrieve all articles', error);
    res.send(error);
  }
}



// export default async (req, res) => {
//   try {
//     console.log('req nom', req.body);
//     const result = await excuteQuery({ ----- excuteQuery === getAllArticles
//       query: 'select * from users',
//       values: [req.body.content],
//     });
//     console.log('ttt', result);
//     res.json(result);
//   } catch (error) {
//     console.log(error);
//   }
// };