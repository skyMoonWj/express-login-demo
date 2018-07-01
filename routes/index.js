const express = require('express')
const router = express.Router()

// home page
router.get('/', function(req, res) {
  res.render('home', {sessionUser: req.session.userInfo})
});

module.exports = router;
