const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const userController = require('../controllers/userController');
const galleryController = require('../controllers/galleryController');


// Images

router.get('/images/', imageController.getApiImages);

router.get('/images/:id', imageController.getApiImageById);

// Users

router.get('/users/', userController.getApiUsers);

router.get('/users/:id', userController.getApiUserById);

// Galleries

router.get('/galleries/', galleryController.getApiGalleries);

router.get('/galleries/:id', galleryController.getApiGalleryById);

module.exports = router;
