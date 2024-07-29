const express = require('express');
const rolController = require('../../controllers/rol.controller');

module.exports = () => {
  const router = express.Router();
  router.post('/', rolController.createRol);
  router.get('/', rolController.getRoles);
  router.get('/:id', rolController.getRolById);
  router.put('/:id', rolController.updateRol);
  router.delete('/:id', rolController.deleteRol);

  return router;
};
