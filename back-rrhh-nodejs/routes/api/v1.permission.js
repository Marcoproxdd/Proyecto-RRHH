const express = require('express');
const router = express.Router();
const permissionController = require('../../controllers/permissionController');

router.post('/request', permissionController.requestPermission);
router.post('/approve', permissionController.approvePermission);

module.exports = router;
