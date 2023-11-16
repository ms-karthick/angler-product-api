require('dotenv').config();
module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  /** DATABASE */
  db: {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    dialect: "mysql",

    // pool is optional, it will be used for Sequelize connection pool configuration
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },

  /** AUTH KEY */
  auth: {
    secret: "our-secret-key"
  }
};


// var mysql = require('mysql');
// require('dotenv').config();
// var conn = mysql.createConnection({
//     host: process.env.DB_HOST,            
//     user: process.env.DB_USER,       
//     password: process.DB_PASS,        
//     database: process.env.DB_NAME     
// }); 
 
// conn.connect(function(err) {
//     if (err) throw err;
//     console.log('Database is connected successfully !');
// });

// module.exports = conn;