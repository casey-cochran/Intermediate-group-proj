const express = require('express');
const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { authorize } = require('../auth');
const { check, validationResult } = require('express-validator');
const { user } = require('pg/lib/defaults');

const router = express.Router();


router.get('/new', authorize, csrfProtection, (req, res) => {

    res.render('new-post', { csrfToken: req.csrfToken() });
});

const postValidators = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Must provide a Title')
        .isLength({ max: 200 })
        .withMessage('Must not be more than 200 characters'),
    check('content')
        .exists({ checkFalsy: true })
        .withMessage('Must provide content to share')
        .isLength({ max: 4000 })
        .withMessage('Must not be more than 4000 characters')
]

router.post('/new', authorize, postValidators, csrfProtection, asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    // const post = { title, content }
    const { userId } = req.session.auth

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await db.HobbyPost.create({ title, content, userId });
        res.redirect('/') //redirect to newly created post?

    } else {
        const errors = validatorErrors.array().map(error => error.msg);
        res.render('new-post', {
            post,
            errors,
            csrfToken: req.csrfToken()
        })
    }
}))

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
    const hobbyPostId = parseInt(req.params.id, 10)
    const hobbyPost = await db.HobbyPost.findByPk(hobbyPostId, { include: 'User' });
    const options = { month: 'short', day: 'numeric' }
    res.render('hobby-post', { hobbyPost, include: { model: db.User }, options })
}))


router.get('/:id(\\d+)/edit', csrfProtection,
    asyncHandler(async (req, res) => {
        const postId = parseInt(req.params.id, 10);
        const post = await db.HobbyPost.findByPk(postId);
        console.log(post.content)
        res.render('edit-post', {
            title: 'Edit Post',
            post,
            csrfToken: req.csrfToken(),
        });
    }));

router.post('/edit/:id(\\d+)', csrfProtection, postValidators,
    asyncHandler(async (req, res) => {
        const postId = parseInt(req.params.id, 10);
        const postToUpdate = await db.HobbyPost.findByPk(postId);

        const {
            title, content,
        } = req.body;

        const post = {
            title, content,
        };

        const validatorErrors = validationResult(req);

        if (validatorErrors.isEmpty()) {
            await postToUpdate.update(post);
            res.redirect(`/hobbyPosts/${postId}`);
        } else {
            const errors = validatorErrors.array().map((error) => error.msg);
            res.render('edit-post', {
                title: 'Edit Post',
                post: { ...post, id: postId },
                errors,
                csrfToken: req.csrfToken(),
            });
        }
    }));

router.get('/:id(\\d+)/delete', authorize, asyncHandler(async (req, res) => {

    const postId = parseInt(req.params.id, 10);
    const post = await db.HobbyPost.findByPk(postId)
    console.log(post)
    res.render('delete-post', { post })
}))




router.post('/:id(\\d+)/delete', authorize, asyncHandler(async (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = await db.HobbyPost.findByPk(postId);
    await post.destroy();
    res.redirect('/')
}))




module.exports = router;
