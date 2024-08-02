const { Rol } = require('../models');

class RolService {
  async create(data) {
    return await Rol.create(data);
  }

  async findAll() {
    return await Rol.findAll();
  }

  async findById(id) {
    return await Rol.findByPk(id);
  }

  async update(id, data) {
    const [updated] = await Rol.update(data, { where: { id } });
    if (updated) {
      return await Rol.findByPk(id);
    }
    throw new Error('Rol no encontrado');
  }

  async delete(id) {
    const deleted = await Rol.destroy({ where: { id } });
    if (deleted) {
      return;
    }
    throw new Error('Rol no encontrado');
  }
}

module.exports = new RolService();
