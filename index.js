'use strict'

let mongoose = require('mongoose');
const app = require('./app');
const port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/portafolio')
    .then(() => {
        console.log('Conexion establecida');

        // Creación del servidor
        app.listen(port, () => {
            console.log('Servidor corriendo correctamente en puerto :3000');
        });

    })
    .catch(err => console.log(err));