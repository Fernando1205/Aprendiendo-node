'use strict';

var Project = require('../models/Project');

var controller = {
    home: function(req, res) {
        return res.status(200).send({
            message: 'Soy la home'
        });
    },
    test: function(req, res) {
        return res.status(200).send({
            message: 'Soy el metodo test'
        });
    },
    saveProject: function(req, res) {
        let project = new Project();

        var params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save((err, projectStored) => {
            if (err) return res.status(500).send({
                message: 'Error en al guardar'
            });

            if (!projectStored) return res.status(404).send({
                message: 'No se ha podido guardar el proyecto'
            });

            return res.status(200).send({
                project: projectStored,
                message: 'Proyecto guardado exitosamente'
            });
        });
    },
    getProject: function(req, res) {
        let id = req.query.id;

        if (id === null) return res.status(404).send({ message: 'No se ha podido obtener el proyecto' });

        Project.findById(id, (err, project) => {
            if (err) return res.status(500).send({
                message: 'Error al devolver los datos'
            });

            if (!project) return res.status(404).send({
                message: 'El proyecto no existe'
            });

            return res.status(200).send({
                project: project
            });
        });
    }
}

module.exports = controller;