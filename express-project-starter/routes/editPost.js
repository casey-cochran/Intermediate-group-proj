var express = require('express');
var router = express.Router();
const db = require('../db/models')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
const { userLogin } = require('../auth.js');
const { asyncHandler, csrfProtection, loginValidators } = require("./utils");

const { HobbyPost, User } = db

const postNotFoundError = (postId) => {
    const err = new Error(`Post #${postId} does not exist.`);
    err.title = "Post not found."
    err.status = 404;
    return err
};

async function lookupUserByPostId(postId) {
    
    const post = await HobbyPost.findOne({
        where: {
            HobbyPost
        },
        include: User
    })
    return post.User
};

// const authorizePost = (req, res, next) = {
//     let user = lookupUserByPostId(HobbyPost.id)
//     if( 
        
         

//     )
// }

// const HobbyPost.findAll()

router.put("/:id(\\d+)", asyncHandler(async (req, res, next) => {
    const postId = parseInt(req.params.id, 10)
    const { userId } = req.session.auth;

    // if (autheticated.)
    const post = await HobbyPost.findByPk(postId)
    if (post && post.userId === userId) {
        const { message } = req.body;
        post.message = message
        await post.save();
        res.json({ post });
    } else {
        next(postNotFoundError(postId))
    }
}))

router.delete("/:id(\\d+)", asyncHandler(async (req, res, next) => {
    const postId = req.params.id;
    const { userId } = req.session.auth;

    const post = await HobbyPost.findByPk(postId)
    if (post && post.userId === userId) {
        await post.destroy()
        res.status(204).end()
    } else {
        next(tweetNotFoundError(postId))
    }
}))

module.exports = router