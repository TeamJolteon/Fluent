const { deleteArticle } = require('../../../db/controllers/articles.js');

 const handler = async (req, res) => {
  try {
    console.log(req.query);
    var user = req.query.user_id
    var titleOfArt = req.query.title;
    var results = await deleteArticle(req.query);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handler;