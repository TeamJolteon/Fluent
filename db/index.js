import mysql from 'mysql2';
// import { dbPass } from '../config.js';
// import { dbAlexPassword } from '../config.js'

const db = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  database: 'volt',
  user: 'root',
  password: '',
});

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: dbAlexPassword,
//   database: 'volt',
//   port: 3306,
// });

export default db;
