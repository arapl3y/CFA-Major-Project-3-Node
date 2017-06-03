
const User = require('../models/User');

exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.json(users);
    });
};

