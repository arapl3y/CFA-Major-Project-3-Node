const User = require('../models/User');
const mongoose = require('mongoose');
const promisify = require('es6-promisify');
const expressValidator = require('express-validator');

exports.loginForm = (req, res) => {
  res.render('login', {
    title: 'Login',
    message: req.flash,
  });
};

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.validateRegister = (req, res, next) => {
  // express validator method
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false,
  });

  req.checkBody('password', 'Password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Confirmed Password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', {
      title: 'Register',
      body: req.body,
      flashes: req.flash(),
    });
    return;
  }
  next();
};

exports.register = async (req, res, next) => {
  try {
    const user = new User({
    email: req.body.email,
    name: req.body.name,
  });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  next(); // pass to auth controller.login
  } catch (error) {
    console.log(error);
  }
};

exports.account = (req, res) => {
  res.render('account', { title: 'Edit Your Account' });
};

exports.updateAccount = async (req, res) => {
  try {
    const updates = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: updates },
    { new: true, runValidators: true, context: 'query' },
  );
  req.flash('success', 'Updated your profile!');
  res.redirect('back');
  } catch (error) {
    console.log(error);
  }
};

// API


exports.getApiUsers = async (req, res) => {
  try {
    const users = await User.find({})
    res.json(users)
  } catch (err) {
    throw Error(err);
  }
};

exports.getApiUserById = async (req, res) => {
   try {
    const user = await User.findOne({ _id: req.params.id })
    res.json(user);
  } catch(err) {
    throw Error(err);
  };
}

