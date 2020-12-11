const axios = require('axios')
const mysql = require('mysql2')
const moment = require('moment')

const apiKey = process.env.CC_API_KEY

const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});


connection.connect(error => {
    if (error) throw error
    else console.log("Successfully connected to the database."); //TODO: virer
});


connection.query('DELETE FROM articles WHERE date < DATE_SUB(NOW() , INTERVAL 7 DAY)', function (err) {
    if (err) throw err
})



axios.get('https://min-api.cryptocompare.com/data/v2/news/', {
    headers: {
        'Authorization': `Apikey: ${apiKey}`
    }
}).then((res) => {
    let lastDate = {
        time: 0,
        elements: []
    }
    let existing = false
    let current = {}

    connection.query('SELECT * FROM articles ORDER BY date DESC', function (err, sqlRes) {
        if (err) throw err
        else if (sqlRes.length > 0) {

            lastDate.time = moment(sqlRes[0].date, "YYYY-MM-DD HH:mm:ss").unix()
            lastDate.elements.push(sqlRes[0])
            for (let i = 1; i < sqlRes.length; i++) {
                if (moment(sqlRes[i].date, "YYYY-MM-DD HH:mm:ss").unix() === lastDate.time) {
                    lastDate.elements.push(sqlRes[i])
                }
            }

        }

        for (let i = res.data.Data.length - 1; i > 0; i--) {

            current = {
                title: res.data.Data[i].title,
                summary: res.data.Data[i].categories,
                source: res.data.Data[i].source,
                date: moment(res.data.Data[i].published_on * 1000).format("YYYY-MM-DD HH:mm:ss"),
                urlpage: res.data.Data[i].url,
                urlimage: res.data.Data[i].imageurl
            }

            if (res.data.Data[i].published_on > lastDate.time) {

                connection.query('INSERT INTO articles SET ?', current, function(err) {
                    if (err) throw err
                })

            } else if (res.data.Data[i].published_on === lastDate.time) {

                for (let j = 0; j < lastDate.elements.length; j++) {
                    if (res.data.Data[i].url === lastDate.elements[j].urlpage) {
                        existing = true
                    }
                }
                if (existing === false) {
                    connection.query('INSERT INTO articles SET ?', current, function(err) {
                        if (err) throw err
                    })
                }
                existing = false

            }
        }
        connection.end()
    })
}).catch((error) => {
    console.error(error)
})



setTimeout(function () {}, 30000)
