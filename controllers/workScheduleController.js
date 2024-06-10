const WorkSchedule = require('../models/workSchedule.model');

exports.createWorkSchedule = async (req, res) => {
    try {
        const schedule = new WorkSchedule(req.body);
        await schedule.save();
        res.status(201).send(schedule);
    } catch (error) {
        res.status(400).send(error);
    }
};
