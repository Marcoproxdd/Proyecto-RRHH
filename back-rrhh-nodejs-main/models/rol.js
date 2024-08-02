// models/rol.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Rol = sequelize.define('Rol', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rol: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING(45),
    allowNull: true
  }
}, {
  tableName: 'rol',
  timestamps: false
});

module.exports = Rol;
