const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const galleryController = require('../controllers/galleryController');

// Home

router.get('/',
  authController.isLoggedIn,
  authController.homePage,
  );



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

// Account

router.get('/account', authController.isLoggedIn, userController.account);

router.post('/account', userController.updateAccount);


// Galleries

router.get('/add', authController.isLoggedIn, galleryController.addGallery);

router.post('/add', galleryController.createGallery);

router.get('/galleries', galleryController.showGalleries);

router.get('/galleries/:id', galleryController.showSingleGallery);

router.post('/galleries/:id/delete', galleryController.deleteGallery);


// Images

router.get('galleries/:id/images', imageController.showImages);

router.post('galleries/:id/images', imageController.addImage);

router.get('galleries/:id/images/:id', imageController.showSingleImage);

// router.get('/images/:id/edit', imageController.editImage);

// router.post('/images/:id/edit', imageController.updateImage);

router.post('/images/:id/delete', imageController.deleteImage);

module.exports = router;
