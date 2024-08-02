const permisoService = require('../services/permiso.service');

exports.create = async (req, res, next) => {
  try {
    const permiso = await permisoService.create(req.body);
    res.status(201).json(permiso);
  } catch (error) {
    next(error);
  }
};

exports.getPermisos = async (req, res) => {
  try {
    const permisos = await Permiso.findAll();
    res.json(permisos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los permisos', error });
  }
};

exports.aprobarPermiso = async (req, res) => {
  try {
    const permiso = await Permiso.findByPk(req.params.id);
    if (permiso) {
      permiso.estado = 'Aprobado';
      await permiso.save();
      res.json({ message: 'Permiso aprobado' });
    } else {
      res.status(404).json({ message: 'Permiso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al aprobar el permiso', error });
  }
};

exports.desactivarPermiso = async (req, res) => {
  try {
    const permiso = await Permiso.findByPk(req.params.id);
    if (permiso) {
      permiso.estado = 'Inactivo';
      await permiso.save();
      res.json({ message: 'Permiso desactivado' });
    } else {
      res.status(404).json({ message: 'Permiso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al desactivar el permiso', error });
  }
};

exports.activarPermiso = async (req, res) => {
  try {
    const permiso = await Permiso.findByPk(req.params.id);
    if (permiso) {
      permiso.estado = 'Activo';
      await permiso.save();
      res.json({ message: 'Permiso activado' });
    } else {
      res.status(404).json({ message: 'Permiso no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al activar el permiso', error });
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

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedPermiso = await permisoService.update(id, req.body);
    res.status(200).json(updatedPermiso);
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;
    await permisoService.delete(id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.findBirthdayPermisos = async (req, res, next) => {
  try {
    const permisos = await permisoService.findBirthdayPermisos();
    res.status(200).json(permisos);
  } catch (error) {
    next(error);
  }
};
