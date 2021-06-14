const { Router } = require( 'express' );
const { check } = require( 'express-validator' );

//Controladores
const { traerUsuarios, 
    traerUsuario, 
    crearUsuario,
    borrarUsuario
} = require('../controllers');
const { validarCampos } = require('../middlewares')
const { usuarioPorIdExiste, emailExiste } = require('../helpers');

const router = new Router();

router.get( '/', traerUsuarios );

router.get( '/:id', [
    check( 'id' ).custom( usuarioPorIdExiste ),
    validarCampos
] , traerUsuario );

router.post( '/', [
    check( 'correo', 'El correo no es valido' ).isEmail(),
    check( 'nombre', 'El nombre es obligatorio').not().isEmpty(),
    check( 'contrasenia', 'La contrasenia debe ser de mas de 6 letras' ).isLength( { min:6 } ),
    check( 'correo' ).custom( emailExiste ),
    validarCampos
] , crearUsuario );

router.delete( '/:id', [
    check('id').custom(usuarioPorIdExiste),
    validarCampos
] , borrarUsuario );

module.exports = router;
