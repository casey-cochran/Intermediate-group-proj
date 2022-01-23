const csrf = require('csurf');
const db = require('../db/models');
const {check} = require('express-validator');

const csrfProtection = csrf({ cookie: true });

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

const loginValidators = [
  check('email')
    .exists({checkFalsy: true})
    .withMessage('Must provide an Email Address'),
  check('password')
    .exists({checkFalsy: true})
    .withMessage('Please provide your password ')
];

const signUpValidators = [
  check('firstName')
    .exists({checkFalsy: true})
    .withMessage('Please provide a First Name')
    .isLength({max: 100})
    .withMessage('First Name must not be more than 100 characters'),
  check('lastName')
    .exists({checkFalsy: true})
    .withMessage('Please provide a Last Name')
    .isLength({max: 100})
    .withMessage('Last Name must not be more than 100 characters'),
  check('email')
    .exists({checkFalsy: true})
    .withMessage('Please provide an Email Address')
    .isLength({max: 255})
    .withMessage('Email must not be more than 255 characters')
    .isEmail()
    .withMessage('Email Address is not valid')
    .custom((value) => {
      return db.User.findOne({where: {email: value}})
        .then((user) => {
          if(user) {
            return Promise.reject('An account with the provided email already exists')
          }
        })
    }),
  check('password')
    .exists({checkFalsy: true})
    .withMessage('Please provide a password')
    .isLength({max: 50})
    .withMessage('Password must not be more than 50 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and a special character'),
  check('confirmPassword')
    .exists({checkFalsy: true})
    .withMessage('Passwords must match')
    .isLength({max: 50})
    .withMessage('Password must not be more than 50 characters')
    .custom((value, {req}) => {
      if(value !== req.body.password){
        throw new Error('Passwords do not match')
      }
      return true;
    })
];

const commentValidators = [
  check('content')
    .exists({checkFalsy: true})
    .withMessage('Must provide a comment Address'),
];

module.exports = {
  csrfProtection,
  asyncHandler,
  signUpValidators,
  loginValidators,
  commentValidators
};
