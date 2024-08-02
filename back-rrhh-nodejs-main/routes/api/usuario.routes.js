const express = require('express');
const usuarioController = require('../../controllers/usuario.controller');

module.exports = () => {
  const router = express.Router();
  router.post('/', usuarioController.createUsuario);
  router.get('/', usuarioController.getUsuarios);
  router.get('/:id', usuarioController.getUsuarioById);
  router.put('/:id', usuarioController.updateUsuario);
  router.delete('/:id', usuarioController.deleteUsuario);
  router.get('/cumpleanos', usuarioController.getBirthdayUsers); // Asegúrate de que esta línea esté correctamente configurada

  return router;
};
