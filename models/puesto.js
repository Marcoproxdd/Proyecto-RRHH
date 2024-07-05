const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Puesto = sequelize.define('Puesto', {
  departamento: {
    type: DataTypes.STRING,
  },
  nombre: {
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.STRING,
  },
  salario: {
    type: DataTypes.DECIMAL,
  },
});

module.exports = Puesto;
