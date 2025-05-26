const { Sequelize, sequelize } = require('../database');

const Student = sequelize.define('Student', {
  sl_no: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  roll: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  room_no: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  payment_status: {
    type: Sequelize.STRING,
    defaultValue: 'NOT PAID',
  },
  room_status: {
    type: Sequelize.STRING,
    defaultValue: 'not_checked_in',
  },
});

module.exports = Student;