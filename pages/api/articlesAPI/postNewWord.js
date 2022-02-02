const { postNewWord, checkExistence } = require('/db/controllers/articles.js');

const handler = async (req, res) => {
  try {
    var results = await checkExistence(req.body);
    console.log('what is results', results);
    res.status(200).send(results);
    //results[0][0].id
  } catch (error) {
    console.log('error to add new word', error)
    res.status(500).send(error);
  }
};

export default handler;


//API - POST:
//localhost:3000/api/articlesAPI/postNewWord

//request body:
//{"user_id":1, "article_id": 1, "word": "evening", "definition":null,"language":"swedish","translation": "kväll", "sentences":"Good morning"}
//{"user_id":1, "article_id": 1, "word": "evening", "definition":null,"language":"japanese","translation": "夜", "sentences":"夜"}