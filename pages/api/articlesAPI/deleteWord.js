const { deleteWord } = require('../../../db/controllers/articles.js');

const handler = async (req, res) => {
  try {
    // var user_id = req.query.user_id;
    // var word_id = req.query.id;
    var results = await deleteWord(req.query);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
}

export default handler;