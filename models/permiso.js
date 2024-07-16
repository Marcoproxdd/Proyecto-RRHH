// models/permiso.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Usuario = require('./usuario');

const Permiso = sequelize.define('Permiso', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  tipoPermiso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaSolicitud: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaInicio: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaFin: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id',
    }
  }
}, {
  tableName: 'permiso',
  timestamps: false,
});

Permiso.belongsTo(Usuario, { foreignKey: 'idUsuario' });

module.exports = Permiso;
