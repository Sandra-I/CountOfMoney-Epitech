const express = require('express')
const app = express()
const port = 3000

var indexRouter = require('./routes/index')

app.use('/', indexRouter)

app.listen(port, () => console.log(`Server listenting on port ${port}.`))