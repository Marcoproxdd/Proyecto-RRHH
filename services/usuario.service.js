const { Usuario } = require('../models');

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
}

module.exports = new UsuarioService();
