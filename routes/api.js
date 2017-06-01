const express = require('express');
const router = express.Router();
const imageApiController = require('../controllers/imageApiController');

// Images

router.get('/images/', imageApiController.getImages);

router.post('/images', imageApiController.uploadImage);

router.put('/images/:id', imageApiController.getSingleImage);

router.delete('/images/:id', imageApiController.deleteImage);

module.exports = router;
