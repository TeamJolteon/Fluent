// post request to add a new user

const createUser = async ({email, password, default_language}) => {
  try {
    var queryString = 'INSERT INTO users (email, password, default_language, isLoggedIn) VALUES (?, ?, ?, true)';
    var params = [email, password, default_language];
    const results = await db.promise().query(queryString, params);
    return results[0];
  } catch (error) {
    return error;
  }
}

const updateUserLanguage = async ({email, default_language}) => {
  try {
    var queryString = 'UPDATE users SET default_language = ? where email = ?';
    var params = [default_language, email];
    const results = await db.promise().query(queryString, params);
    return results[0];
  } catch (error) {
    return error;
  }
}

const signOut = async ({ email }) => {
  try  {
    var queryString = 'UPDATE users SET isLoggedIn = false where email = ?';
    var params = [email];
    const results = await db.promise().query(queryString, params);
    return results[0];
  } catch (error) {
    return error;
  }
}

