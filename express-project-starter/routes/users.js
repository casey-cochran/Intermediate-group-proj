var express = require('express');
var router = express.Router();
const db = require('../db/models')
const bcrypt = require('bcryptjs')
const { csrfProtection, asyncHandler, signUpValidators } = require('./utils');
const validationResult = require('express-validator')



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* GET user sing up page */
router.get('/sign-up', csrfProtection, (req, res) => {
  const user = db.User.build();
  res.render('user-registration', {
    title: 'Register',
    user,
    csrfToken: req.csrfToken(),
  });
})

router.post('/sign-up',
    signUpValidators,
    csrfProtection,
    asyncHandler (async (req, res) => {
        const {
            email,
            firstName,
            lastName,
            password
        } = req.body

        const user = db.User.build({
            email,
            firstName,
            lastName
        });

        const validatorErrors = validationResult(req);

        if(validatorErrors.isEmpty()) {
            const hashedPassword = await bcrypt.hash(password, 10)
            user.hashedPassword = hashedPassword;
            await user.save();
            res.redirect('/')
        } else {
            const errors = validatorErrors.array().map((err) => err.msg);
            res.render('user-registration', {
                title: 'Register',
                user,
                csrfToken: req.csrfToken(),
                errors
            });
        }
}));

module.exports = router;
