const express = require('express');
const router = express.Router();
const workScheduleController = require('../../controllers/workScheduleController');

router.post('/create', workScheduleController.createWorkSchedule);

module.exports = router;
