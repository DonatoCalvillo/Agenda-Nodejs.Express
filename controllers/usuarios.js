const { response, request } = require("express");
const bcryptjs = require( 'bcryptjs' );

const Usuario = require("../models/usuario");

const traerUsuarios = async ( req = request, res = response ) => {

    const usuarios = await Usuario.findAll({
        where: {
            estado : true
        }
    });   

    res.json( { usuarios } );
}

const traerUsuario = async ( req = request, res = response ) => {

    const { id } = req.params;
    
    const usuario = await Usuario.findByPk( id );   

    res.json( { usuario } );
}

const crearUsuario = async ( req = request, res = response ) => {

    const { nombre, correo, contrasenia } = req.body;

    try {
        //Encriptar contrasenia
        const salt = bcryptjs.genSaltSync();

        const contraseniaTemp = bcryptjs.hashSync(contrasenia, salt);
        
        //Crear usuario
        const usuario =  Usuario.build( { nombre, correo, 'contrasenia' : contraseniaTemp } );
        
        //Guardar usuario en db
        await usuario.save();

        res.json( usuario );
        
    } catch (error) {

        console.log( error );
        
        res.status(500).json( { msg: 'Hable con el administrador' } );

    }
}

const actualizarUsuario = async ( req = request, res = response ) => {

    const { id } = req.params;
    const { correo, contrasenia, ...data } = req.body;

    const { correo : correoToken, id : idToken } = req.usuario;

    try {

        if ( id != idToken ){
            return res.status( 400 ).json( { msg : 'El id enviado no coincide con el id del token' } );
        }
        
        if( correoToken != correo ) {

            const existeEmail = await Usuario.findOne( { 
                where : {
                    correo,
                    'estado' : true
                }
            } );

            if( existeEmail ) {
                return res.status(404).json({
                    msg: `El correo: ${ correo }, ya existe`
                });
            }

        }

        const usuario = await Usuario.findByPk( id );

        //Encriptar contrasenia
        const salt = bcryptjs.genSaltSync();
        const contraseniaTemp = bcryptjs.hashSync(contrasenia, salt);

        const newData = { ...data, 'contrasenia' : contraseniaTemp, correo };

        await usuario.update( newData );

        res.json( { usuario } );
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

const borrarUsuario = async(req, res = response) => {
    const { id } = req.params;

    try {
        //Verificar que el id del JWT sea la misma que la cuenta a borrar
        const { id : idtoken } = req.usuario;

        if( id != idtoken ) {
            return res.status( 400 ).json( { msg : 'El id enviado no coincide con el id del token' } );
        }

        const usuario = await Usuario.findByPk( id );
        await usuario.update( { estado: false } );
    
        res.json( { usuario, 'estado' : 'Eliminado' } );
        
    } catch (error) {

        console.log(error);
        res.status(500).json( { msg: 'Hable con el administrador' } );
    }

}

module.exports = { 
    actualizarUsuario,
    borrarUsuario,
    crearUsuario,
    traerUsuario,
    traerUsuarios,
}