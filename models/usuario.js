const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');
const Rol = require('./rol');
const Departamento = require('./departamento');

const Usuario = sequelize.define('Usuario', {
  identificacion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  },
  usuariocol: {
    type: DataTypes.STRING,
    allowNull: true
  },
  id_rol: {
    type: DataTypes.INTEGER,
    references: {
      model: Rol,
      key: 'id'
    }
  },
  departamento_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Departamento,
      key: 'id'
    }
  }
}, {
  tableName: 'usuario',
  timestamps: false
});

Usuario.belongsTo(Rol, { foreignKey: 'id_rol' });
Usuario.belongsTo(Departamento, { foreignKey: 'departamento_id' });

module.exports = Usuario;
