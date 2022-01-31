import getAllArticles from '../../db/controllers/articles.js';

 const handler = async (req, res) => {
  try {
    var results = await getAllArticles();
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handler;
