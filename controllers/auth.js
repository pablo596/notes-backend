const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya está registrado',
      });
    }
    const usuario = new Usuario(req.body);
    console.log(usuario);
    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // Generar mi JWT
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

// const login
// {ok: true, msg: 'login'}

const login = async (req, res = response) => {
  const { email, password } = req.body;
  console.warn({ email, password });
  // return req;
  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({
        ok: false,
        msg: 'Email no encontrado',
      });
    }

    // Validar
    const validPassword = bcrypt.compareSync(password, usuario.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: 'La contraseña no es válida',
      });
    }

    // const usuario = new Usuario(req.body);
    const token = await generarJWT(usuario.id);
    console.log(usuario);
    const { nombre, date, email: correo } = usuario;
    res.json({
      ok: true,
      usuario: { nombre, date, correo, password },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;

  const token = await generarJWT(uid);

  const usuario = await Usuario.findById(uid);

  res.json({
    ok: true,
    usuario,
    token,
  });
};

module.exports = {
  crearUsuario,
  login,
  renewToken,
};
