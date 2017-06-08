const passport = require('passport');

exports.homePage = (req, res) => {
  res.render('index');
};

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: true,
  successRedirect: '/',
  successFlash: 'Welcome!',
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are now logged out!');
  res.redirect('/login');
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  req.flash('error_msg', 'Oops! You must be logged in!');
  res.redirect('/login');
};
