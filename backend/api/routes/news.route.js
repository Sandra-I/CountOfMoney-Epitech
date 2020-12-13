let router = require('express').Router()

const news = require("../controllers/news.controller.js")


router.get('/articles', news.getArticleList);
router.get('/articles/:id', news.getArticleById);

module.exports = router
