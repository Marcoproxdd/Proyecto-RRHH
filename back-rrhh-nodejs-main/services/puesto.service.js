const { Puesto } = require('../models');

class PuestoService {
  async create(data) {
    return await Puesto.create(data);
  }

  async findAll() {
    return await Puesto.findAll();
  }

  async findById(id) {
    return await Puesto.findByPk(id);
  }

  async update(id, data) {
    const [updated] = await Puesto.update(data, {
      where: { id }
    });
    if (updated) {
      return await Puesto.findByPk(id);
    }
    return null;
  }

  async delete(id) {
    const deleted = await Puesto.destroy({
      where: { id }
    });
    return deleted;
  }
}

module.exports = new PuestoService();
