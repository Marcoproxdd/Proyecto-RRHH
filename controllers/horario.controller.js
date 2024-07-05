const Horario = require('../models/horario');

exports.create = async (req, res) => {
  try {
    const horario = await Horario.create(req.body);
    res.status(201).json(horario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const horarios = await Horario.findAll();
    res.status(200).json(horarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
