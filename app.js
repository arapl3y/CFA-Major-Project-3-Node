const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const path = require('path');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const passport = require('passport');
const promisify = require('es6-promisify');

const User = require('./models/User');

const app = express();

mongoose.connect('mongodb://alex:asdfasdf@ds159371.mlab.com:59371/virtualgallery');
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to virtual gallery database');
});

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');


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
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
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

module.exports = app;
