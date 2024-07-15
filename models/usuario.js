// models/usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Rol = require('./rol');
const Puesto = require('./puesto');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombres: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  identificacion: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  usuario: {
    type: DataTypes.STRING(45),
    allowNull: false
  },
  contraseña: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  usuariocol: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  idPuesto: {
    type: DataTypes.INTEGER,
    references: {
      model: Puesto,
      key: 'id'
    }
  },
  idRol: {
    type: DataTypes.INTEGER,
    references: {
      model: Rol,
      key: 'id'
    }
  },
  idDepartamento: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Departamento',
      key: 'id'
    }
  }
}, {
  tableName: 'usuario',
  timestamps: false
});

Usuario.belongsTo(Rol, { foreignKey: 'idRol' });
Usuario.belongsTo(Puesto, { foreignKey: 'idPuesto' });

module.exports = Usuario;
