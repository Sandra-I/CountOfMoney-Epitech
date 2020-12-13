const current = require("../controllers/cryptos.controller.js");
const checkToken = require("../JsonWebToken/JsonWebToken.js")


module.exports = app => {
    app.get('/cryptos/all', current.all)

    // Create a new crypto
    app.post('/cryptos', current.create);

    // Delete a crypto
    app.delete('/cryptos/:cmid', current.delete);

    //  get all crypto of table crypto with params money /cryptos?userid=
    app.get('/cryptos', current.findAll);

    //  get one crypto information of crypto 
    app.get('/cryptos/:cmid', current.findOne);

     //  get one crypto and period
     app.get('/cryptos/:cmid/history/:period', checkToken.checkToken, current.findOnes);

}