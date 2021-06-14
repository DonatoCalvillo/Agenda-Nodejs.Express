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

const borrarUsuario = async(req, res = response) => {
    const { id } = req.params;

    try {

        const usuario = await Usuario.findByPk( id );
        await usuario.update( { estado: false } );
    
        res.json( { usuario } );
        
    } catch (error) {

        console.log(error);
        res.status(500).json( { msg: 'Hable con el administrador' } );
    }

}

module.exports = { 
    borrarUsuario,
    crearUsuario,
    traerUsuario,
    traerUsuarios,
}