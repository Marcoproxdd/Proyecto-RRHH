const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Usuario = require('./usuario');
const Departamento = require('./departamento');

const Horario = sequelize.define('Horario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dia: {
    type: DataTypes.DATE,
    allowNull: false
  },
  horaEntrada: {
    type: DataTypes.DATE,
    allowNull: false
  },
  horaSalida: {
    type: DataTypes.DATE,
    allowNull: false
  },
  horasExtra: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  compensaciones: {
    type: DataTypes.FLOAT,
    defaultValue: 0.00
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id'
    }
  },
  idDepartamento: {
    type: DataTypes.INTEGER,
    references: {
      model: Departamento,
      key: 'id'
    }
  }
}, {
  tableName: 'horario',
  timestamps: false
});

Horario.belongsTo(Usuario, { foreignKey: 'idUsuario' });
Horario.belongsTo(Departamento, { foreignKey: 'idDepartamento' });

module.exports = Horario;
