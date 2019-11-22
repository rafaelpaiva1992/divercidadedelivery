const mysql = require('mysql2');
 
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'divercidade',
//   password: '1234'
// });

const connection = mysql.createConnection({
  host: '35.224.87.218',
  user: 'rafa',
  database: 'divercidade',
  password: 'Google2#'
});


module.exports = connection;