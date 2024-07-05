// models/horario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Usuario = require('./usuario');

const Horario = sequelize.define('Horario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id'
    }
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  hora_inicio: {
    type: DataTypes.TIME,
    allowNull: false
  },
  hora_fin: {
    type: DataTypes.TIME,
    allowNull: false
  },
  horas_extra: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {
  tableName: 'horario',
  timestamps: false
});

Horario.belongsTo(Usuario, { foreignKey: 'usuario_id' })
module.exports = Horario;