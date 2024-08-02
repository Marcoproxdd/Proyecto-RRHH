const express = require('express');
const permisoController = require('../../controllers/permiso.controller');

module.exports = () => {
  const router = express.Router();
  router.post('/', permisoController.create);
  router.get('/', permisoController.findAll);
  router.get('/usuario/:usuarioId', permisoController.findByUsuario);
  router.post('/aprobar/:permisoId', permisoController.approvePermiso);
  router.put('/:id', permisoController.update); // Ruta para actualizar permiso
  router.delete('/:id', permisoController.delete); // Ruta para eliminar permiso
  router.get('/cumpleanos', permisoController.findBirthdayPermisos); // Ruta para obtener permisos de cumpleaños
  router.post('/:id/aprobar', permisoController.aprobarPermiso);
router.post('/:id/desactivar', permisoController.desactivarPermiso);
router.post('/:id/activar', permisoController.activarPermiso);
  return router;
};
