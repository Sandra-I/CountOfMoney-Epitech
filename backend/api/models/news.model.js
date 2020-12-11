const sql = require("../db.js")

class Article {

    id = 0
    maxValue = 30
    before = null
    after = null


    constructor(requestParams) {
        if (requestParams) {
            if (Number.isInteger(+requestParams.id))
                this.id = (+requestParams.id)

            if (Number.isInteger(+requestParams.maxValue))
                this.maxValue = (+requestParams.maxValue)

            if (requestParams.before)
                this.before = requestParams.before

            if (requestParams.after)
                this.after = requestParams.after
        }
    }


    fetchOne(callback) {
        sql.query('SELECT * FROM articles WHERE id = ? LIMIT 1', [this.id], function(err, res) {
            if (err) {
                callback(err)
            } else if (res.length > 0) {
                callback(res[0])
            } else {
                callback(null)
            }
        })
    }


    fetchSome(callback) {
        let sqlString = "SELECT * FROM articles "
        let stmtArgs = []

        if (this.before !== null && this.after !== null) {
            sqlString += "WHERE date BETWEEN ? AND ? "
            stmtArgs.push(this.after)
            stmtArgs.push(this.before)
        } else if (this.before !== null) {
            sqlString += "WHERE date <= ? "
            stmtArgs.push(this.before)
        } else if (this.after !== null) {
            sqlString += "WHERE date >= ? "
            stmtArgs.push(this.after)
        }
        sqlString += "ORDER BY date "
        if (this.after !== null && this.before === null) {
            sqlString += "ASC "
        } else {
            sqlString += "DESC "
        }
        sqlString += "LIMIT ?"
        stmtArgs.push(this.maxValue)

        sql.query(sqlString, stmtArgs, function(err, res) {
            if (err) {
                callback(err)
            } else if (res.length > 0) {
                callback(res)
            } else {
                callback(null)
            }
        })
    }
}

module.exports = Article
