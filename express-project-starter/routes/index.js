var express = require('express');
const { asyncHandler } = require('./utils');
var router = express.Router();

const db = require('../db/models')

/* GET home page. */
router.get('/', asyncHandler(async (req, res) => {
  const hobbyPosts = await db.HobbyPost.findAll({
    include: {model: db.User}
  })

  const time = hobbyPosts.createdAt
  const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', date: 'numeric' }
  // const value = time.toLocaleDateString('en-Us', options)

  res.render('home-page', {
    hobbyPosts,
    options
  });

}));

module.exports = router;
