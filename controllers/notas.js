const { response } = require('express');
const Nota = require('../models/nota');

const getNotas = async (req, res = response) => {
  const notas = await Nota.find();
  console.log('notas: ', notas);

  res.json({
    ok: true,
    notas,
  });
  // {ok: true, msg: 'getUsuarios'}
};

const crearNota = async (req, res = response) => {
  const { title, description } = req.body;

  try {
    const nota = new Nota(req.body);

    await nota.save();

    res.json({
      ok: true,
      nota,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};
const actualizarNota = async (req, res = response) => {
  const { title, description, uid } = req.body;

  try {
    const nota = await Nota.findOneAndUpdate(
      { _id: uid },
      { title: title, description: description },
      {
        new: true,
      }
    );

    res.json({
      ok: true,
      nota,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

const eliminarNota = async (req, res = response) => {
  const { uid } = req.body;
  console.log(uid);
  try {
    Nota.findOneAndDelete({ _id: uid })
      .exec()
      .then((nota) => {
        console.log(nota);
        res.json({
          ok: true,
          nota,
        });
      })
      .catch((err) => {
        res.json({
          ok: false,
          error: err,
        });
      });
    // const nota = new Nota(req.body);

    // await nota.save();

    // res.json({
    //   ok: true,
    //   nota,
    // });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador',
    });
  }
};

module.exports = {
  getNotas,
  crearNota,
  actualizarNota,
  eliminarNota,
};
