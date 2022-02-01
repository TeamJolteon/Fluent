const { getVocabListAlphabetically } = require('/db/controllers/flashcards.js');

const handler = async (req, res) => {
  try {
    var results = await getVocabListAlphabetically();
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handler;