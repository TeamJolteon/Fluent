const { updateVocablist } = require('/db/controllers/flashcards.js');

const handler = async (req, res) => {
  try {
    var results = await updateVocablist(req.body);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handler;

//put: localhost:3000/api/vocabAPI/updateVocablist
