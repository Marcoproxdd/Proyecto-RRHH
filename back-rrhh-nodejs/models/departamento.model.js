const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize');

class Departamento extends Model {}

Departamento.init({
  Departamento_id: {
    type: DataTypes.INTEGER,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'Departamento',
  timestamps: true,
  hooks: {
    beforeCreate: async (Departamento, options) => {
      const lastDepartamento = await Departamento.findOne({
        order: [['createdAt', 'DESC']],
      });

      const nextDepartamentoId = lastDepartamento ? lastDepartamento.Departamento_id + 1 : 1;
      Departamento.Departamento_id = nextDepartamentoId;
    },
  },
});

module.exports = Departamento;
