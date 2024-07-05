const Puesto = require('../models/puesto');

exports.create = async (req, res) => {
  try {
    const { departamento, nombre, descripcion, salario } = req.body;
    const puesto = await Puesto.create({ departamento, nombre, descripcion, salario });
    res.status(201).json(puesto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const puestos = await Puesto.findAll();
    res.status(200).json(puestos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
