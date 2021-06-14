const express = require('express')
const cors = require('cors');
const db = require('../db/connection');

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Rutas
        this.paths = {
            auth        :   '/api/auth',
            buscar      :   '/api/buscar',
            categorias  :   '/api/categorias',
            productos   :   '/api/productos',
            usuarios    :   '/api/usuarios',
            uploads    :   '/api/uploads'
        }

        //Conexion a la db
        this.conectarDB();

        //Moddlewares
        this.middlewares();

        //Rutas de mi app
        this.routes();
    }

    async conectarDB(){
        try {
            await db.authenticate();
            console.log( 'Database ONLINE' );
        } catch (error) {
            throw new Error( error );
        }
    }

    routes(){
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.auth, require('../routes//auth'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log('servidor corriendo en el puerto ', this.port);
        })
    }

    middlewares(){

        //CORSE sirve para que solo se puedam hacer peticiones
        //desde ciertas paginas web
        this.app.use(cors());

        //Parseo y lectura de body
        this.app.use(express.json());
        
        //Directorio publico
        this.app.use(express.static('public'));

    }
    
}

module.exports = Server