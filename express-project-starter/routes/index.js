var express = require('express');
const { asyncHandler } = require('./utils');
var router = express.Router();

const db = require('../db/models')

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  const hobbyPosts = await db.HobbyPost.findAll({
    include: {model: db.User}
  })


  res.render('home-page', {
    hobbyPosts
  });

}));

module.exports = router;
