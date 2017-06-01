const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Images

router.get('/', imageController.homePage);

router.get('/images/:id', imageController.showImage);

router.put('/images/:id');

router.post('/images/:id/delete', imageController.deleteImage);

// Users

router.get('/login', userController.loginForm);

router.post('/login', authController.login);

router.get('/register', userController.registerForm);

router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login
);

router.get('/logout', authController.logout);

module.exports = router;
