const Sequelize = require("sequelize");
const db = require("../database.config.js");

const Pgns = db.define("pgns", {
  name: {
    type: Sequelize.STRING,
  },
  pgn: {
    type: Sequelize.TEXT,
  },
});

module.exports = Pgns;
