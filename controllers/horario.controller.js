const horarioService = require('../services/horario.service');

class HorarioController {
  async create(req, res) {
    try {
      const horario = await horarioService.create(req.body);
      res.status(201).json(horario);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const horarios = await horarioService.findAll();
      res.status(200).json(horarios);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findByDepartamento(req, res) {
    try {
      const { departamentoId } = req.params;
      const horarios = await horarioService.findByDepartamento(departamentoId);
      res.status(200).json(horarios);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateHorasExtra(req, res) {
    try {
      const { id } = req.params;
      const updatedHorario = await horarioService.updateHorasExtra(id, req.body);
      res.status(200).json(updatedHorario);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async registrarHorasExtra(req, res) {
    try {
      const updatedHorario = await horarioService.registrarHorasExtra(req.body);
      res.status(200).json(updatedHorario);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findHorasExtra(req, res) {
    try {
      const horarios = await horarioService.findHorasExtra();
      res.status(200).json(horarios);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new HorarioController();
