// controllers/permiso.controller.js
const Permiso = require('../models').Permiso;

exports.createPermiso = async (req, res) => {
  try {
    const permiso = await Permiso.create(req.body);
    res.status(201).json(permiso);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPermisos = async (req, res) => {
  try {
    const permisos = await Permiso.findAll();
    res.status(200).json(permisos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPermisoById = async (req, res) => {
  try {
    const permiso = await Permiso.findByPk(req.params.id);
    if (permiso) {
      res.status(200).json(permiso);
    } else {
      res.status(404).json({ error: 'Permiso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePermiso = async (req, res) => {
  try {
    const [updated] = await Permiso.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPermiso = await Permiso.findByPk(req.params.id);
      res.status(200).json(updatedPermiso);
    } else {
      res.status(404).json({ error: 'Permiso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePermiso = async (req, res) => {
  try {
    const deleted = await Permiso.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Permiso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
