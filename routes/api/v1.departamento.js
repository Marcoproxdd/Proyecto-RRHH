const { Router } = require('express');
const container = require('../../config/container');
const DepartamentoController = container.resolve('DepartamentoController');

const router = Router();

router.post('/', (req, res, next) => {
  DepartamentoController.createDepartment(req, res, next);
});

module.exports = router;
