const express = require('express');
const puestoController = require('../../controllers/puesto.controller');

module.exports = () => {
    const router = express.Router();

    router.post('/', puestoController.create);
    router.get('/', puestoController.findAll);

    return router;
};
