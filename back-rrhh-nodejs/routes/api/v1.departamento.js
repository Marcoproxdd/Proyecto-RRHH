const express = require('express');
const router = express.Router();
const departmentController = require('../../controllers/departmentController');

router.post('/create', departmentController.createDepartment);
router.post('/assign', departmentController.assignUserToDepartment);

module.exports = router;
