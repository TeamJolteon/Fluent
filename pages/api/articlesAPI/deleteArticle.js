const { deleteArticle } = require('../../../db/controllers/articles.js');

 const handler = async (req, res) => {
  try {
    console.log(req.body);
    var user = req.body.user_id
    var titleOfArt = req.body.title;
    var results = await deleteArticle(req.body);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handler;