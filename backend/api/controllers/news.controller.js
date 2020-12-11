const moment = require('moment')
const Article = require('../models/news.model.js')


function checkQueryVars(q) {
    let queryVars = {
        id: 0,
        warn: {
            log: []
        }
    }

    if (q.maxValue) {
        let mv = (+q.maxValue)

        if (Number.isInteger(mv) && mv > 0)
            queryVars["maxValue"] = mv
        else
            queryVars.warn.log.push("maxValue: maxValue must be a whole number and greater than 0. Default value will be used.")
    }
    if (q.before) {
        if (moment(q.before, "YYYYMMDD-HHmmss").isValid())
            queryVars["before"] = moment(q.before, "YYYYMMDD-HHmmss").format("YYYY-MM-DDTHH:mm:ss.SSS")
        else
            queryVars.warn.log.push("before: Date format invalid, specified value will be ignored. It must be formatted this way with a 24-hour format: YYYYMMDD-HHMMSS (ex: 20201225-162451).")
    }
    if (q.after) {
        if (moment(q.after, "YYYYMMDD-HHmmss").isValid())
            queryVars["after"] = moment(q.after, "YYYYMMDD-HHmmss").format("YYYY-MM-DDTHH:mm:ss.SSS")
        else
            queryVars.warn.log.push("after: Date format invalid, specified value will be ignored. It must be formatted this way with a 24-hour format: YYYYMMDD-HHMMSS (ex: 20201225-162451).")
    }
    return queryVars
}


exports.getArticleList = (req, res) => {
    let queryVars = checkQueryVars(req.query)
    let articles = new Article(queryVars)

    articles.fetchSome((result) => {
        let response = {
            warn: {},
            result: result
        }

        if (queryVars.warn.log.length > 0) {
            response.warn["log"] = queryVars.warn.log
            response.warn["status"] = "invalid"
        } else response.warn["status"] = "ok"

        if (result === null) {
            res.status(404).send({
                message: "No article found."
            })
        } else res.send(response)
    })
}


exports.getArticleById = (req, res) => {
    let nbr = (+req.params.id)
    if (Number.isInteger(nbr) && nbr >= 0) {
        let article = new Article({
            id: nbr
        })

        article.fetchOne((result) => {
            if (result === null) {
                res.status(404).send({
                    message: "No article found with id " + nbr + "."
                })
            } else res.send(result)
        })
    } else {
        res.status(400).send({
            message: "Invalid article ID, it must be a whole number and greater than 0."
        })
    }
}


