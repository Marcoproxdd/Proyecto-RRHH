const mongoose = require('mongoose');

const WorkScheduleSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
    workHours: { type: Number, required: true },
    extraHours: { type: Number, default: 0 },
    date: { type: Date, required: true }
});

module.exports = mongoose.models.WorkSchedule || mongoose.model('WorkSchedule', WorkScheduleSchema);
