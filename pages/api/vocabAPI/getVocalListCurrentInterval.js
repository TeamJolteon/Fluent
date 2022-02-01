const { getVocalListCurrentInterval } = require('/db/controllers/flashcards.js');

const handler = async (req, res) => {
  try {
    var results = await getVocalListCurrentInterval();
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handler;

//localhost:3000/api/vocabAPI/getVocalListCurrentInterval