const { Sequelize, sequelize } = require('../database');

const Administrator = sequelize.define('Administrator', {
  admin_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Administrator;