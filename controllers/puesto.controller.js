const { PuestoService } = require('../services');

exports.createPuesto = async (req, res) => {
  try {
    const puesto = await PuestoService.create(req.body);
    res.status(201).json(puesto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPuestos = async (req, res) => {
  try {
    const puestos = await PuestoService.findAll();
    res.status(200).json(puestos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPuestoById = async (req, res) => {
  try {
    const puesto = await PuestoService.findById(req.params.id);
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
    const updatedPuesto = await PuestoService.update(req.params.id, req.body);
    if (updatedPuesto) {
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
    const deleted = await PuestoService.delete(req.params.id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Puesto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
