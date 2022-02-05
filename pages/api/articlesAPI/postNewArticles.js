const { postNewArticles } = require('/db/controllers/articles.js');

const handler = async (req, res) => {
  try {
    var results = await postNewArticles(req.body);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handler;

//API - POST:
//localhost:3000/api/articlesAPI/postNewArticles

//request body:
/*
{
  "user_id":1,
  "url": null,
  "title":"new article title",
  "date_written":"2022-02-01",
  "date_uploaded":"2022-02-01",
  "Public":true,
  "publication":"BBC",
  "text":"this is the 3rd article",
  "userUploaded":true
}
*/
