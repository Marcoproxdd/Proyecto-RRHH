const { Departamento } = require('../models');

exports.create = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const newDepartamento = await Departamento.create({ nombre, descripcion });
    res.status(201).json(newDepartamento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const departamentos = await Departamento.findAll();
    res.status(200).json(departamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
