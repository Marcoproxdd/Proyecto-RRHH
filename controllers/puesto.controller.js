// controllers/puesto.controller.js
const Puesto = require('../models').Puesto;

exports.createPuesto = async (req, res) => {
  try {
    const puesto = await Puesto.create(req.body);
    res.status(201).json(puesto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPuestos = async (req, res) => {
  try {
    const puestos = await Puesto.findAll();
    res.status(200).json(puestos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPuestoById = async (req, res) => {
  try {
    const puesto = await Puesto.findByPk(req.params.id);
    if (puesto) {
      res.status(200).json(puesto);
    } else {
      res.status(404).json({ error: 'Puesto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePuesto = async (req, res) => {
  try {
    const [updated] = await Puesto.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPuesto = await Puesto.findByPk(req.params.id);
      res.status(200).json(updatedPuesto);
    } else {
      res.status(404).json({ error: 'Puesto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePuesto = async (req, res) => {
  try {
    const deleted = await Puesto.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Puesto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
