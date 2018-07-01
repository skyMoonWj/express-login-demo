// dependencies
const express = require('express')
const userModel = require('../mock/users')

const router = express.Router()

// users page
router.get('/', function(req, res, next) {
  const users = userModel.getAll()
  res.render('user/users', {users, sessionUser: req.session.userInfo})
});

module.exports = router;
