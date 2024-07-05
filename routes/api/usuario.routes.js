const express = require('express');
const usuarioController = require('../../controllers/usuario.controller');

module.exports = () => {
    const router = express.Router();

    router.post('/', usuarioController.create);
    router.get('/', usuarioController.findAll);

    return router;
};
