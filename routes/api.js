const express = require('express');
const router = express.Router();
const imageApiController = require('../controllers/imageApiController');
const userApiController = require('../controllers/userApiController');
const galleryApiController = require('../controllers/galleryApiController');


// Images

router.get('/images/', imageApiController.getImages);

router.post('/images', imageApiController.uploadImage);

router.delete('/images/:id', imageApiController.deleteImage);

// Users

router.get('/users/', userApiController.getUsers);

// Galleries

router.get('/galleries', galleryApiController.getGalleries);

module.exports = router;
