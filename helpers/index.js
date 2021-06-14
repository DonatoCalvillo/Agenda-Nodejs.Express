const dbValidator = require( './db-validator' );
const generarJWT = require( './generar-jwt' );

module.exports = {
    ...dbValidator,
    ...generarJWT
}