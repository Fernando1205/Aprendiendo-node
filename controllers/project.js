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
    },
    getProjects: function(req, res) {
        Project.find({}).sort('year').exec((err, project) => {
            if (err) return res.status(500).send({
                message: 'Error al devolver los datos'
            });

            if (!project) return res.status(404).send({
                message: 'No se ha podido encontrar datos'
            });

            return res.status(200).send({
                project: project
            });
        });
    },
    updateProject: function(req, res) {
        console.log(req.params.id);
        let projectId = req.params.id;
        let update = req.body;

        Project.findByIdAndUpdate(projectId, update, { new: true }, (err, projectUpdated) => {
            if (err) return res.status(500).send({
                message: 'Error al actualizar los datos'
            });

            if (!projectUpdated) return res.status(404).send({
                message: 'No se ha podido encontrar el dato a actualizar'
            });

            return res.status(200).send({
                project: projectUpdated
            });
        });
    },
    deleteProject: function(req, res) {
        let id = req.params.id;
        Project.findByIdAndDelete(id, (err, project) => {
            if (err) return res.send({ message: 'Error al eliminar proyecto' });

            if (!project) return res.send({ message: 'No se ha encontrado el proyecto a eliminar' });

            return res.send({
                project: project
            })
        });
    }

}

module.exports = controller;