const { Usuario } = require('../models');
const { sequelize } = require('../models');
const { Op } = require('sequelize');

class UsuarioService {
  async createUsuario(data) {
    return await Usuario.create(data);
  }

  async getUsuarios() {
    return await Usuario.findAll();
  }

  async getUsuarioById(id) {
    return await Usuario.findByPk(id);
  }

  async updateUsuario(id, data) {
    const [updated] = await Usuario.update(data, {
      where: { id }
    });
    if (updated) {
      return await Usuario.findByPk(id);
    }
    return null;
  }

  async deleteUsuario(id) {
    return await Usuario.destroy({
      where: { id }
    });
  }

  async getBirthdayUsers(month, day) {
    // Asegurarse de que los parámetros estén definidos
    if (!month || !day) {
      throw new Error('Month and day parameters are required.');
    }

    // Configurar la zona horaria del sistema a 'America/Guayaquil'
    await sequelize.query("SET time_zone = 'America/Guayaquil';");

    return await Usuario.findAll({
      where: {
        [Op.and]: [
          sequelize.where(sequelize.fn('MONTH', sequelize.col('cumpleanios')), month),
          sequelize.where(sequelize.fn('DAY', sequelize.col('cumpleanios')), day)
        ]
      }
    });
  }
}

module.exports = new UsuarioService();
