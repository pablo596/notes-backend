/* 
    path: api/usuarios
*/

const { Router } = require('express');
const {
  getNotas,
  crearNota,
  eliminarNota,
  actualizarNota,
} = require('../controllers/notas');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

const router = Router();

router.get('/', validarJWT, getNotas);
router.post(
  '/new',
  [
    validarJWT,
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('description', 'la descripción es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  crearNota
);
router.put(
  '/update',
  [
    validarJWT,
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('description', 'la descripción es obligatoria').not().isEmpty(),
    validarCampos,
  ],
  actualizarNota
);
router.delete(
  '/delete',
  [validarJWT, check('uid', 'El uid es obligatorio').not().isEmpty()],
  eliminarNota
);
// router.delete('/delete', validarJWT, getNotas);
// router.put('/edit', validarJWT, getNotas);

module.exports = router;
