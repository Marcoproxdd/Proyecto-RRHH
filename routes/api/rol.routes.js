const express = require('express');
const rolController = require('../../controllers/rol.controller');

module.exports = () => {
    const router = express.Router();

    router.post('/', rolController.create);
router.get('/', rolController.findAll);
router.put('/:id', rolController.update);
router.delete('/:id', rolController.delete);


    return router;
};
