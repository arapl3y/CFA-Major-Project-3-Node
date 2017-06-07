const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const galleryController = require('../controllers/galleryController');

// Home

router.get('/',
  authController.isLoggedIn,
  galleryController.showGalleries,
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

router.get('/galleries/:id/edit', galleryController.editGallery);

router.post('/add/:id', galleryController.updateGallery);

router.get('/galleries/:slug', galleryController.getGalleryBySlug);

router.get('/galleries/:id', galleryController.getGalleryById);

router.get('/galleries',
  authController.isLoggedIn,
  galleryController.showGalleries
  );

// router.get('/galleries/:id', galleryController.showSingleGallery);

router.get('/galleries/:id/delete', galleryController.deleteGallery);


// Images

router.post('/images/:id',
  authController.isLoggedIn,
  imageController.addImage
);

router.get('/images/:id', imageController.getImageById);

// router.get('/images/:id/edit', imageController.editImage);

// router.post('/images/:id/edit', imageController.updateImage);

router.get('/images/:id/delete', imageController.deleteImage);

module.exports = router;
