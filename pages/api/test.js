import getAllArticles from '/Users/shuwenliang/Documents/BlueOcean/english/db/testdb.js';

const handler = async (req, res) => {
  try {
    const result = await getAllArticles();
    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(err);
  }
  // getAllArticles((err, result) => {
  //   if(err) {
  //     res.status(500).send(err);
  //   } else {
  //     res.status(201).send(result);
  //   }
  // })
};

export default handler;