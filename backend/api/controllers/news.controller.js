const News = require("../models/news.model.js")

function getArticleList(req, res) {
    let queryVars = {
        id: 0
    }
    if (Number.isInteger(req.query.maxValue)) {
        queryVars["maxValue"] = req.query.maxValue
    }
    if (req.query.before) { //TODO: vérification de date
        queryVars["before"] = req.query.before
    }
    if (req.query.after) { //TODO: vérification de date
        queryVars["after"] = req.query.after
    }
    let articles = new News.Article(queryVars)
    articles.fetchSome((result) => {
        if (result === null) {
            res.status(404).send({
                message: "No article found with id " + req.params.userId + "."
            });
        } else res.send(data);
    })
}

function getArticleById(req, res) {
    let article = new News.Article({
        id: req.params.id
    })
    article.fetchOne((result) => {
        if (result === null) {
            res.status(404).send({
                message: "No article found with id " + req.params.userId + "."
            });
        } else res.send(data);
    })
}

module.exports = [getArticleList, getArticleById]
