const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const path = require('path');
const ejs = require('ejs');
const expressValidator = require('express-validator');
const passport = require('passport');
const promisify = require('es6-promisify');

const User = require('./models/User');

const app = express();

mongoose.connect('mongodb://localhost/virtualgallery');
mongoose.Promise = global.Promise;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(expressValidator());

app.use(cookieParser());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.use((req, res, next) => {
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// init routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next) {
  res.status(422).send({error: err.message})
});

app.listen(process.env.port || 3000, function(){
  console.log('Now listening for requests');
});
