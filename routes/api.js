const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const userController = require('../controllers/userController');
const galleryController = require('../controllers/galleryController');


// Images

router.get('/images/', imageController.getApiImages);

// Users

router.get('/users/', userController.getApiUsers);

// Galleries

router.get('/galleries/', galleryController.getApiGalleries);

module.exports = router;
