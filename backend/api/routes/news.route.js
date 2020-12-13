let router = require('express').Router()
const news = require("../controllers/news.controller.js")


router.get('/news/articles', news.getArticleList);
router.get('/news/articles/:id', news.getArticleById);

module.exports = router
