const { RolService } = require('../services');

exports.createRol = async (req, res, next) => {
  try {
    const rol = await RolService.create(req.body);
    res.status(201).json(rol);
  } catch (error) {
    next(error);
  }
};

exports.getRoles = async (req, res, next) => {
  try {
    const roles = await RolService.findAll();
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

exports.getRolById = async (req, res, next) => {
  try {
    const rol = await RolService.findById(req.params.id);
    if (rol) {
      res.status(200).json(rol);
    } else {
      res.status(404).json({ error: 'Rol no encontrado' });
    }
  } catch (error) {
    next(error);
  }
};

exports.updateRol = async (req, res, next) => {
  try {
    const updatedRol = await RolService.update(req.params.id, req.body);
    res.status(200).json(updatedRol);
  } catch (error) {
    if (error.message === 'Rol no encontrado') {
      res.status(404).json({ error: error.message });
    } else {
      next(error);
    }
  }
};

exports.deleteRol = async (req, res, next) => {
  try {
    await RolService.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'Rol no encontrado') {
      res.status(404).json({ error: error.message });
    } else {
      next(error);
    }
  }
};
