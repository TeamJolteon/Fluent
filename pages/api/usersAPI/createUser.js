const { createUser } = require('/db/controllers/users.js');

const handler = async (req, res) => {
  try {
    var results = await createUser(req.body);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handler;