const Permission = require('../models/Permission');

exports.requestPermission = async (req, res) => {
    try {
        const permission = new Permission(req.body);
        await permission.save();
        res.status(201).send(permission);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.approvePermission = async (req, res) => {
    try {
        const { permissionId } = req.body;
        const permission = await Permission.findById(permissionId);
        permission.status = 'approved';
        await permission.save();
        res.status(200).send(permission);
    } catch (error) {
        res.status(400).send(error);
    }
};
