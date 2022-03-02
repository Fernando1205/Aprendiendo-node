'use strict';

var Project = require('../models/Project');
const fs = require('fs');
const path = require('path');

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

            return res.status(201).send({
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

            return res.status(200).send({
                project: project
            })
        });
    },
    uploadImage: function(req, res) {
        let id = req.params.id;
        let fileName = 'Imagen no subida...';

        if (req.files) {
            let filePath = req.files.image.path;
            let fileSplit = filePath.split('\\');
            let fileName = fileSplit[1];
            let exSplit = fileName.split('\.');
            let fileExt = exSplit[1];

            if (fileExt === 'png' || fileExt === 'jpg' || fileExt === 'jpeg' || fileExt === 'gif') {

                Project.findByIdAndUpdate(id, { image: fileName }, { new: true }, (err, project) => {

                    if (err) return res.status(500).send({ message: 'Archivo no se ha subido' });

                    if (!project) return res.status(404).send({ message: 'No se ha encontrado el proyecto' });

                    return res.status(200).send({
                        project: project
                    });
                });
            } else {
                fs.unlink(filePath, (err) => {
                    return res.status(200).send({
                        message: 'La extensión no es validad'
                    });
                });
            }

        } else {
            return res.status(200).send({
                message: fileName
            });
        }
    },
    getImageFile: function(req, res) {
        let file = req.params.image;
        let path_file = './uploads/' + file;

        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({
                    message: 'No existe la imagen'
                });
            }
        })
    }

}

module.exports = controller;