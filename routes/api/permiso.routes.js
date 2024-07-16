const express = require('express');
const permisoController = require('../../controllers/permiso.controller');

module.exports = () => {
  const router = express.Router();
  router.post('/', permisoController.create);
  router.get('/', permisoController.findAll);
  router.get('/usuario/:usuarioId', permisoController.findByUsuario);
  router.post('/aprobar/:permisoId', permisoController.approvePermiso); // Asegúrate de que la ruta POST para aprobar esté bien configurada
  
  return router;
};
