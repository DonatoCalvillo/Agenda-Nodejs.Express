const { Router } = require( 'express' );
const { check } = require( 'express-validator');

const { login } = require('../controllers');

const { validarCampos } = require( '../middlewares' );

const router = Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('contrasenia', 'La contrasenia es obligatorio').not().isEmpty(),
    validarCampos
] , login );

module.exports = router;