
const User = require('../models/User');

exports.getUsers = (req, res) => {
  User.find({})
    .then(function(users) {
      res.send(users)
    });
}

