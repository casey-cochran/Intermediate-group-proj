var express = require('express');
var router = express.Router();
const db = require('../db/models')
const bcrypt = require('bcryptjs')
const { userLogin, userLogout } = require('../auth.js');

const { asyncHandler, csrfProtection } = require("./utils");



/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('login', {
        title: 'Login',
        csrfToken: req.csrfToken(),
    });
});




module.exports = router;