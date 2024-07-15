const express = require('express');
const permisoController = require('../../controllers/permiso.controller');

module.exports = () => {
  const router = express.Router();
  router.post('/', permisoController.createPermiso);
  router.get('/', permisoController.getPermisos);
  router.get('/:id', permisoController.getPermisoById);
  router.put('/:id', permisoController.updatePermiso);
  router.delete('/:id', permisoController.deletePermiso);
  return router;
};
