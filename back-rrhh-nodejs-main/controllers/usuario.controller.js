const usuarioService = require('../services/usuario.service');

exports.createUsuario = async (req, res, next) => {
  try {
    const usuario = await usuarioService.createUsuario(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    next(error);
  }
};

exports.getUsuarios = async (req, res, next) => {
  try {
    const usuarios = await usuarioService.getUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
};

exports.getUsuarioById = async (req, res, next) => {
  try {
    const usuario = await usuarioService.getUsuarioById(req.params.id);
    if (!usuario) {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      res.status(200).json(usuario);
    }
  } catch (error) {
    next(error);
  }
};

exports.updateUsuario = async (req, res, next) => {
  try {
    const usuario = await usuarioService.updateUsuario(req.params.id, req.body);
    if (!usuario) {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      res.status(200).json(usuario);
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteUsuario = async (req, res, next) => {
  try {
    const usuario = await usuarioService.deleteUsuario(req.params.id);
    if (!usuario) {
      res.status(404).json({ message: 'Usuario no encontrado' });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    next(error);
  }
};

exports.getBirthdayUsers = async (req, res, next) => {
  try {
    const { month, day } = req.query;
    const birthdayUsers = await usuarioService.getBirthdayUsers(month, day);
    if (birthdayUsers.length > 0) {
      res.status(200).json(birthdayUsers);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    next(error);
  }
};
