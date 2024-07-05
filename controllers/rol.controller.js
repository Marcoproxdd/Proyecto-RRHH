// controllers/rol.controller.js
const Rol = require('../models/rol');

exports.create = async (req, res) => {
  try {
    const rol = await Rol.create(req.body);
    res.status(201).json(rol);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Rol.update(req.body, { where: { id: id } });
    if (updated) {
      const updatedRol = await Rol.findOne({ where: { id: id } });
      res.status(200).json(updatedRol);
    } else {
      res.status(404).json({ message: 'Rol not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Rol.destroy({ where: { id: id } });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Rol not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
