var express = require('express');
var router = express.Router();
const db = require('../db/models')
const bcrypt = require('bcryptjs')
const { csrfProtection, asyncHandler, signUpValidators } = require('./utils');
const { validationResult } = require('express-validator');
const { userLogin, userLogout } = require('../auth.js');



/* GET users listing. */
router.get('/', function (req, res, next) {
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
  asyncHandler(async (req, res) => {
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

    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hash(password, 10)
      user.hashedPass = hashedPassword;
      await user.save();
      userLogin(req, res, user);
      return req.session.save(() => res.redirect('/'))

      // res.redirect('/')
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

router.post('/logout', (req, res) => {
  userLogout(req, res);
  req.session.save(() => res.redirect('/'))
});

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const userId = parseInt(req.params.id, 10)
  const hobbyPosts = await db.HobbyPost.findAll({
    
    where: {
      userId
    },
    
    include: db.User
  })
  
  const options = { month: 'short', day: 'numeric' }
  res.render('user-posts-page', { userId, hobbyPosts, options })
}))

module.exports = router;
