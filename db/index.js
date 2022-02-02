import mysql from 'mysql2';

// const db = mysql({
//   config: {
//     host: 'localhost',
//     port: 3306,
//     database: 'volt',
//     user: 'root',
//     password: ''
//   }
// });
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'volt',
  port: 3306,
});

export default db;

// db.connect();

// export default async function excuteQuery({ query, values }) {
//   try {
//     const results = await db.query(query, values);
//     await db.end();
//     return results;
//   } catch (error) {
//     return { error };
//   }
// }
