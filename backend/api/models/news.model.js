const sql = require("../db.js")

class Article {

    id = 0
    maxValue = 30
    before = null
    after = null

    constructor(requestParams) {
        if (requestParams && Number.isInteger(requestParams.id)) {
            this.id = requestParams.id
        }
        if (requestParams && Number.isInteger(requestParams.maxValue)) {
            this.maxValue = requestParams.maxValue
        }
        if (requestParams && requestParams.before) {
            this.before = requestParams.before
        }
        if (requestParams && requestParams.after) {
            this.after = requestParams.after
        }
    }

    fetchOne(callback) {
        sql.query('SELECT * FROM articles WHERE id = ? LIMIT 1', [this.id], function(err, res) {
            if (err) {
                callback(err)
            } else if (res.length > 0) {
                callback(res[0])
            }
            callback(null)
        })
    }

    fetchSome(callback) {
        let sqlString = "SELECT * FROM articles "
        let stmtArgs = []
        if (this.before != null) {
            sqlString += "AND date <= ? "
            stmtArgs.push(this.before)
        }
        if (this.after != null) {
            sqlString += "AND date >= ? "
            stmtArgs.push(this.after)
        }
        sqlString += "ORDER BY date DESC LIMIT ?"
        stmtArgs.push(this.maxValue)

        sql.query(sqlString, stmtArgs, function(err, res) {
            if (err) {
                callback(err)
            } else if (res.length > 0) {
                callback(res)
            }
            callback(null)
        })
    }
}

