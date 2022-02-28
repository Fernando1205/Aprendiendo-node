'use strict';

const express = require('express');
var bodyParser = require('body-parser');

const app = express();

// Cargar archivos de Rutas
var project_routes = require('./routes/project');

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS

// RUTAS
app.use('/api', project_routes);

// Exportar
module.exports = app;