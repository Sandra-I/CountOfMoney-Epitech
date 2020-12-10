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
    else console.log("Successfully connected to the database.");
});


connection.query('DELETE FROM articles WHERE date < DATE_SUB(NOW() , INTERVAL 7 DAY)', function (err, res) {
    if (err) {
        console.error(err)
    } else if (res.length > 0) {
        console.log("Deleted " + res.length + " outdated entries.")
    }
})

axios.get('https://min-api.cryptocompare.com/data/v2/news/', {
    headers: {
        'Authorization': `Apikey: ${apiKey}`
    }
}).then((res) => {
    let lastDate = 0
    let lastDateElements = []
    let existing = false
    let current = {}

    connection.query('SELECT * FROM articles ORDER BY date DESC', function (err, sqlRes) {
        if (err) {
            console.error(err)
        } else if (sqlRes.length > 0) {
            lastDate = moment(sqlRes[0].date, "YYYY-MM-DD HH:MM:SS").unix()
            lastDateElements.push(sqlRes[0])
            for (let i = 1; i < sqlRes.length; i++) {
                if (moment(sqlRes[i].date, "YYYY-MM-DD HH:MM:SS").unix() === lastDate) {
                    lastDateElements.push(sqlRes[i])
                }
            }
        }
    })

    for (let i = 1; i < res.data.length; i++) {
        current = {
            title: res.data[i].title,
            summary: res.data[i].categories,
            source: res.data[i].source,
            date: moment(res.data[i].published_on).format("YYYY-MM-DD HH:MM:SS"),
            urlpage: res.data[i].url,
            urlimage: res.data[i].imageurl
        }
        if (res.data[i].published_on > lastDate) {
            connection.query('INSERT INTO articles SET ?', current, function(err) {
                if (err) {
                    console.error(err)
                }
            })
        } else if (res.data[i].published_on === lastDate) {
            for (let j = 0; j < lastDateElements.length; j++) {
                if (res.data[i].url === lastDateElements[j].urlpage) {
                    existing = true
                }
            }
            if (existing === false) {
                connection.query('INSERT INTO articles SET ?', current, function(err) {
                    if (err) {
                        console.error(err)
                    }
                })
            }
            existing = false
        }
    }
    connection.end()
    console.log('Restarting in 30 seconds.')
}).catch((error) => {
    console.error(error)
})


setTimeout(function () {
    console.log('Restarting...');
}, 30000)
