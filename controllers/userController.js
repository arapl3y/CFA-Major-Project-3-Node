const User = require('../models/User');
const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const expressValidator = require('express-validator');

exports.loginForm = (req, res) => {
  res.render('login', {
    title: 'Login',
    message: req.flash
  });
}

exports.registerForm = (req, res) => {
  res.render('register', {title: 'Register'});
}

exports.validateRegister = (req, res, next) => {
  // express validator method
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });

  req.checkBody('password', 'Password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Confirmed Password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', {title: 'Register', body: req.body, flashes: req.flash()})
    return;
  }
  next();
};

exports.register = async (req, res, next) => {
  const user = new User({ email: req.body.email, name: req.body.name });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  res.send('it works');
  next(); //pass to auth controller.login
}
