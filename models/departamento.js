const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Departamento = sequelize.define('Departamento', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'departamento', // Asegúrate de que el nombre de la tabla sea correcto
  timestamps: false, // Si no tienes timestamps en la tabla
});

module.exports = Departamento;
