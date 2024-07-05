const Department = require('../models/Department');
const User = require('../models/User');

exports.createDepartment = async (req, res) => {
    try {
        const department = new Department(req.body);
        await department.save();
        res.status(201).send(department);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.assignUserToDepartment = async (req, res) => {
    try {
        const { userId, departmentId } = req.body;
        const user = await User.findById(userId);
        user.department = departmentId;
        await user.save();
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};
