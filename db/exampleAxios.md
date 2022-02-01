  ******Below is an example of an Axios call that can be placed on front end components and interact with the DB.



  var test;
  var testError;
  axios.get('/api/flashcards')
    .then((res) => {
      console.log('return:', res);
      test = res.data;
    })
    .catch(err => {console.log('err:', err)
 testError = res.data});



****************Below this line is an example of ahow to create a custom endpoint
********remember that the name of hteh file is the endpoint you are calling on your axios call.
- create a xxxx.js file within api folder
- add the following to this file:

import excuteQuery from "../../db";

const worry = async (req, res) => {
  try {
    console.log('req nom', req.body);
    const result = await excuteQuery({
      query: 'select * from users',
      values: [req.body.content],
    });
    console.log('ttt', result);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
};

export default worry;