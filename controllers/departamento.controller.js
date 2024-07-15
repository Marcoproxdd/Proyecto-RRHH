// controllers/departamento.controller.js
const Departamento = require('../models').Departamento;

exports.createDepartamento = async (req, res) => {
  try {
    const departamento = await Departamento.create(req.body);
    res.status(201).json(departamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDepartamentos = async (req, res) => {
  try {
    const departamentos = await Departamento.findAll();
    res.status(200).json(departamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDepartamentoById = async (req, res) => {
  try {
    const departamento = await Departamento.findByPk(req.params.id);
    if (departamento) {
      res.status(200).json(departamento);
    } else {
      res.status(404).json({ error: 'Departamento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDepartamento = async (req, res) => {
  try {
    const [updated] = await Departamento.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedDepartamento = await Departamento.findByPk(req.params.id);
      res.status(200).json(updatedDepartamento);
    } else {
      res.status(404).json({ error: 'Departamento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDepartamento = async (req, res) => {
  try {
    const deleted = await Departamento.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Departamento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
