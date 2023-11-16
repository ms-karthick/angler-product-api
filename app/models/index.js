const config = require("../../config/config.js");
const { Sequelize, DataTypes, Op } = require("sequelize");

const sequelize = new Sequelize(
  config.db.DB_NAME,
  config.db.DB_USER,
  config.db.DB_PASS,
  {
    host: config.db.DB_HOST,
    dialect: config.db.dialect,
    operatorsAliases: 0,

    poll: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle
    }
  }
);

sequelize.authenticate().then(()=> {
  console.log("Connection has been stablised successfully.");
  }).catch(err => {
  console.log("Unable to connect to the database" , err);
  })

const db = {};

db.Sequelize = Sequelize;
db.Op = Op;
db.sequelize = sequelize;

db.product = require("./product.js")(sequelize, Sequelize, DataTypes);

module.exports = db;