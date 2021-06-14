const Usuario = require("../models/usuario");

const usuarioPorIdExiste = async ( id ) => {

    const usuario = await Usuario.findOne( {
        where : {
            id,
            estado : true
        }
    } );   

    if ( !usuario ) {
        throw new Error(`El id: ${ id }, no existe`);
    }
    
};

const emailExiste = async ( correo ) => {

    const existeEmail = await Usuario.findOne({
        where: {
            correo,
            estado : true
        }
    })

    if ( existeEmail ) { 
        throw new Error( `El correo: ${ correo }, ya se encuentra registrado `);
    }

};

module.exports = {
    emailExiste,
    usuarioPorIdExiste,
}