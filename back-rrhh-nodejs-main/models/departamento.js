// models/departamento.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Departamento = sequelize.define('Departamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'departamento',
  timestamps: false
});

module.exports = Departamento;
