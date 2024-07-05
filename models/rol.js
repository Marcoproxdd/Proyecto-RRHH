const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Rol = sequelize.define('Rol', {
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'rol', // Nombre de la tabla
  timestamps: false, 
});

module.exports = Rol;
