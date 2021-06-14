const { Sequelize } = require( 'sequelize' );

const db = new Sequelize( 'node' , 'root', 'Reycena99$', {
    host    :   'localhost',
    dialect :   'mysql'
});

module.exports = db;