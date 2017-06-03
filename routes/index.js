const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const galleryController = require('../controllers/galleryController');

// Images

router.get('/',
  authController.isLoggedIn,
  imageController.ImageHomePage,
  );

router.get('/images/:id', imageController.showImage);

// router.get('/images/:id/edit', imageController.editImage);

// router.post('/images/:id/edit', imageController.updateImage);

router.post('/images/:id/delete', imageController.deleteImage);

// Galleries
router.get('/galleries',
  authController.isLoggedIn,
  galleryController.showGalleries,
  );

router.get('/galleries/:id', galleryController.showSingleGallery);

router.post('/galleries', galleryController.createGallery);

router.post('/galleries/:id/delete', galleryController.deleteGallery);

// Users

router.get('/login', userController.loginForm);

router.post('/login', authController.login);

router.get('/register', userController.registerForm);

router.post('/register',
  userController.validateRegister,
  userController.register,
  authController.login,
  );

router.get('/logout', authController.logout);

router.get('/account', authController.isLoggedIn, userController.account);

router.post('/account', userController.updateAccount);

module.exports = router;
