const { Horario, Usuario } = require('../models');
const { Op } = require('sequelize');

class HorarioService {
  async create(data) {
    return await Horario.create(data);
  }

  async findAll() {
    return await Horario.findAll();
  }

  async findByDepartamento(departamentoId) {
    return await Horario.findAll({
      where: {
        idDepartamento: departamentoId
      },
      include: [
        {
          model: Usuario,
          attributes: ['nombres']
        }
      ]
    });
  }

  async findHorasExtra() {
    return await Horario.findAll({
      where: {
        horasExtra: {
          [Op.gt]: 0
        }
      }
    });
  }

  async updateHorasExtra(id, data) {
    const horario = await Horario.findByPk(id);
    if (!horario) {
      throw new Error('Horario not found');
    }
    return await horario.update(data);
  }

  async registrarHorasExtra(data) {
    const { id, horasExtra, compensaciones } = data;
    const horario = await Horario.findByPk(id);
    if (!horario) {
      throw new Error('Horario no encontrado');
    }
    horario.horasExtra = horasExtra;
    horario.compensaciones = compensaciones;
    await horario.save();
    return horario;
  }
  async deleteHorario(id) {
    const horario = await this.findById(id);
    if (horario) {
      await horario.destroy();
      return true;
    }
    return false;
  }
  async findById(id) {
    return Horario.findByPk(id);
  }
}

module.exports = new HorarioService();
