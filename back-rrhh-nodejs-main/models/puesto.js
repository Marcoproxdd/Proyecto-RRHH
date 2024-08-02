// models/puesto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Puesto = sequelize.define('Puesto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  departamento: {
    type: DataTypes.INTEGER,
    references: {
      model: 'departamento',
      key: 'id'
    }
  },
  nombre: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  salario: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  tableName: 'puesto',
  timestamps: false
});

module.exports = Puesto;
