var express = require('express');
var router = express.Router();
const db = require('../db/models')
const bcrypt = require('bcryptjs')


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user sing up page */
router.get('/sign-up', )

module.exports = router;
