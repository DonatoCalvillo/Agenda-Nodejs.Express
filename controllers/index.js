const Usuarios = require( './usuarios' );
const Auth = require( './auth' );

module.exports = {
    ...Auth,
    ...Usuarios,
}