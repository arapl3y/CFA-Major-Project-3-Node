const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const path = require('path');
const exphbs = require('express-handlebars');
const helpers = require('handlebars-helpers')();
const expressValidator = require('express-validator');
const passport = require('passport');
const promisify = require('es6-promisify');
const errorHandlers = require('./handlers/errorHandlers');

const app = express();

const mlabpw = process.env.VRGMLabPassword

mongoose.connect(`mongodb://alex:${mlabpw}@ds159371.mlab.com:59371/virtualgallery`);
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to Virtual Gallery database 📡');
});

app.use(cors());

// app.use(function (req, res, next) {
//     res.setHeader('Expires', '0')
//     res.setHeader('Pragma', 'no-cache')
//     res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
//     next()
// })

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
  defaultLayout: 'layout'
}));

const hbs = exphbs.create({
  helpers: {
    compare: function (lvalue, operator, rvalue, options) {

      var operators, result;

      if (arguments.length < 3) {
          throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
      }

      if (options === undefined) {
          options = rvalue;
          rvalue = operator;
          operator = "===";
      }

      operators = {
          '==': function (l, r) { return l == r; },
          '===': function (l, r) { return l === r; },
          '!=': function (l, r) { return l != r; },
          '!==': function (l, r) { return l !== r; },
          '<': function (l, r) { return l < r; },
          '>': function (l, r) { return l > r; },
          '<=': function (l, r) { return l <= r; },
          '>=': function (l, r) { return l >= r; },
          'typeof': function (l, r) { return typeof l == r; }
      };

      if (!operators[operator]) {
          throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
      }

      result = operators[operator](lvalue, rvalue);

      if (result) {
          return options.fn(this);
      } else {
          return options.inverse(this);
      }
    }
  }
});

app.set('view engine', 'handlebars');

app.use(morgan("dev"));

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(expressValidator());

app.use(cookieParser());

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

app.use(passport.initialize());
app.use(passport.session());


// Passport config
const User = require('./models/User');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  next();
});

// promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req);
  next();
});

// init routes
app.use('/', require('./routes/index'));
app.use('/api', require('./routes/api'));

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);

app.listen(process.env.PORT || 3000, () => {
  console.log('Server now listening... 👂');
});

module.exports = app;

