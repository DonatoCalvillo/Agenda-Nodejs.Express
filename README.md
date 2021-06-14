# API REST - AGENDA DE CONTACTOS
***
Esta es una API REST de una agenda de contactos construida en NodeJs con el framework Express para la facilidad de los middlewares y los controladores. Otorga un registro, un login, agregar contactos, modificarlos, y agregar imagenes tanto para los usuarios como para los contactos.

## Tabla de contenido
1. [ Estado del Proyecto ] (#estado-del-proyecto)
2. [ Requisitos ] (#requisitos)
3. [ Instalacion ] (#instalacion)

## Estado del proyecto

En desarrollo v.0.0.1
Fase actual: "Api Usuarios terminado (falta validar JWT)"
Futuro: terminas la parte de AUTH para poder lanzar JWT y validar o autenticar las entradas de nuestros usuarios mediante un login con correo y contrasenia y google para terminar la API de usuarios.

## Requisitos

* NodeJs
* Express - Framework que facilita hacer la REST API
* Mysql - Base de datos
* Bcryptjs - Encriptacion de contrasenias
* Cors - Sirve para que solo se puedan hacer peticiones desde ciertas paginas web
* Dotenv - Nos otorga variables de entorno
* Express-validator - Nos ayuda con validaciones personalizadas en los middlewares
* Sequelize - Hace de interprete entre la base de datos y el backend

## Instalacion

Primero necesitaremos reconstruir los modulos de Node con el comando: 
```npm install```

## Funcionamiento

Una vez con los paquetes necesarios instalados la aplicacion funciona de la siguiente manera: 

* En el app.js que es el primer archivo que se ejecuta tenemos una instancia de Server que es donde vamos a localizar las rutas, middlewares y endpoints para el correcto funcionamiento de la API, ademas de hacer la configuracion de ENV para usar las variables de entorno correctamente.

* En la clase server vamos a requerir de express, cors y de la conexion con la base de datos, que este caso es MYSQL y la conexion se encuentra en su respectiva carpeta /db.

* En la db hacemos uso de Sequelize que es el puente entre la base datos y el backend en donde creamos una nueva instancia de nuestra db pasandole los parametros como el nombre de la base de datos, el usuario, la contrasenia, el host y el dialecto porque sequelize soporta otras bases de datos relacionales.

* En esta clase en el constructor le asignamos las variables app y port (que viene del archivo .env) ademas de un arreglo de rutas que nos serviran como endpoints para verificar la informacion que se quiera manejar. Mandamos llamar a la conexion de la base de datos, a los middlewars y a las rutas (que es en donde se usa el arrglo PATH anterior mencionado).

* En la funcion de las rutas se hace referencia a nuestras rutas personalizadas que estan en nuestra carpeta /routes que contienen el tipo de peticion (get, post, put, delete, ...) y les asignamos sus validaciones o middlewares para lo que express-validator nos va a ayudar y mandamos a llamar a su respectivo controlador para que pueda procesar la informacion como se desea

* En la carpeta /controllers nos topamos clasificados por archivos los controladores que hacen falta para que la API funcione haciendo las funciones asyncronas para esperar los resultados que estemos pidiendo a la base de datos con parametros como el request (en donde vendra la informacion) y la response (en donde podemos poner un estado en caso de error y su respectivo mensaje) y dentro de estas funciones  se maneja la logica que se desea dependiendo de la accion.

* Los modelos espejean las tablas que tenemos en la base de datos utilizando la herramienta sequelize.

* Los helpers contienen funciones que utilizaremos en las validaciones customizadas dentro de la carpeta de rutas.

## Autor 

***
Edgar Donato Calvillo Lumbreras 13/06/21
