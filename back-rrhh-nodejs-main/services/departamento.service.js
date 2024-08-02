const { Departamento } = require('../models');

class DepartamentoService {
  async createDepartamento(data) {
    return await Departamento.create(data);
  }

  async getDepartamentos() {
    return await Departamento.findAll();
  }

  async getDepartamentoById(id) {
    return await Departamento.findByPk(id);
  }

  async updateDepartamento(id, data) {
    const [updated] = await Departamento.update(data, {
      where: { id }
    });
    if (updated) {
      return await Departamento.findByPk(id);
    }
    return null;
  }

  async deleteDepartamento(id) {
    return await Departamento.destroy({
      where: { id }
    });
  }
}

module.exports = new DepartamentoService();
