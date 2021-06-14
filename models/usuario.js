const { DataTypes } = require( 'sequelize' );
const db = require( '../db/connection' );

const Usuario = db.define('Usuario',{
    nombre : {
        type: DataTypes.STRING
    },
    correo : {
        type: DataTypes.STRING
    },
    contrasenia : {
        type: DataTypes.STRING
    },
    estado : {
        type: DataTypes.BOOLEAN
    },
    imagen : {
        type: DataTypes.STRING
    }
});

Usuario.prototype.toJSON = function () {   
    var { contrasenia, estado, ...user} = Object.assign({}, this.get());  

    return user; 
}

module.exports = Usuario;