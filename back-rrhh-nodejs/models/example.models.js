const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize'); // Importa sequelize correctamente

class Example extends Model {}

Example.init({
  example_id: {
    type: DataTypes.INTEGER,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'Example',
  timestamps: true,
  hooks: {
    beforeCreate: async (example, options) => {
      const lastExample = await Example.findOne({
        order: [['createdAt', 'DESC']],
      });

      const nextExampleId = lastExample ? lastExample.example_id + 1 : 1;
      example.example_id = nextExampleId;
    },
  },
});

module.exports = Example;
