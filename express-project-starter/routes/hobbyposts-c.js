const express = require('express');
const db = require('../db/models');
const {csrfProtection, asyncHandler} = require('./utils');
const { authorize } = require('../auth');
const {check, validationResult} = require('express-validator');

const router = express.Router();


router.get('/new',authorize, csrfProtection, (req,res) => {

    res.render('new-post', {csrfToken: req.csrfToken()});
})

const postValidators = [
    check('title')
        .exists({checkFalsy: true})
        .withMessage('Must provide a Title')
        .isLength({max: 200})
        .withMessage('Must not be more than 200 characters'),
    check('content')
        .exists({checkFalsy: true})
        .withMessage('Must provide content to share')
        .isLength({max: 4000})
        .withMessage('Must not be more than 4000 characters')
]

router.post('/', authorize, postValidators, csrfProtection, asyncHandler(async(req,res) => {
    const {title, content} = req.body;
    const post = {title, content}

    const validatorErrors = validationResult(req);

    if(validatorErrors.isEmpty()){
        await db.HobbyPost.create({post});
        res.redirect('/posts') //redirect to newly created post?

    }else {
        const errors = validatorErrors.array().map(error => error.msg);
        res.render('new-post', {
            post,
            errors,
            csrfToken: req.csrfToken()
        })
    }
}))










module.exports = router;
