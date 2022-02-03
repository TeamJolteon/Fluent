const { getUser } = require('/db/controllers/users.js');

const handler = async (req, res) => {
  try {
    var results = await getUser(req.query.email);
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
};

export default handler;

//after a user is created, the "insertId" is the [id] in user table
//FE team can use this id to get articles and words
