const { DepartamentoService } = require('../services');

exports.createDepartamento = async (req, res) => {
  try {
    const departamento = await DepartamentoService.createDepartamento(req.body);
    res.status(201).json(departamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDepartamentos = async (req, res) => {
  try {
    const departamentos = await DepartamentoService.getDepartamentos();
    res.status(200).json(departamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDepartamentoById = async (req, res) => {
  try {
    const departamento = await DepartamentoService.getDepartamentoById(req.params.id);
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
    const updatedDepartamento = await DepartamentoService.updateDepartamento(req.params.id, req.body);
    if (updatedDepartamento) {
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
    const deleted = await DepartamentoService.deleteDepartamento(req.params.id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Departamento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
