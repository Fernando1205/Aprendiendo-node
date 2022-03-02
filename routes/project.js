'use strict';

const express = require("express");
var ProjectController = require('../controllers/project');

var router = express.Router();

// Middleware
const multipart = require('connect-multiparty');
var multipartMidlware = multipart({ uploadDir: "./uploads" });

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/projects/:id', ProjectController.updateProject);
router.delete('/projects/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', multipartMidlware, ProjectController.uploadImage);
router.get('/get-image/:image', ProjectController.getImageFile);
module.exports = router;