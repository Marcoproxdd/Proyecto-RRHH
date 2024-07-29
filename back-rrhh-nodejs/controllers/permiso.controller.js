const permisoService = require('../services/permiso.service');

exports.create = async (req, res, next) => {
  try {
    const permiso = await permisoService.create(req.body);
    res.status(201).json(permiso);
  } catch (error) {
    next(error);
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const permisos = await permisoService.findAll();
    res.status(200).json(permisos);
  } catch (error) {
    next(error);
  }
};

exports.findByUsuario = async (req, res, next) => {
  try {
    const { usuarioId } = req.params;
    const permisos = await permisoService.findByUsuario(usuarioId);
    res.status(200).json(permisos);
  } catch (error) {
    next(error);
  }
};

exports.approvePermiso = async (req, res, next) => {
  try {
    const { permisoId } = req.params;
    const permiso = await permisoService.approvePermiso(permisoId);
    res.status(200).json(permiso);
  } catch (error) {
    next(error);
  }
};
