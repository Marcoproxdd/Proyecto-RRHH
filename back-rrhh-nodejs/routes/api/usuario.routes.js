const express = require('express');
const usuarioController = require('../../controllers/usuario.controller');

module.exports = () => {
  const router = express.Router();
  router.post('/', usuarioController.createUsuario);
  router.get('/', usuarioController.getUsuarios);
  router.get('/:id', usuarioController.getUsuarioById);
  router.put('/:id', usuarioController.updateUsuario);
  router.delete('/:id', usuarioController.deleteUsuario);

  return router;
};
