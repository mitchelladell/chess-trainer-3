const Sequelize = require("sequelize");

const sequelize = new Sequelize("arab_chess", "mitch", "1234", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
