let router = require('express').Router()
const current = require("../controllers/cryptos.controller.js");
const checkToken = require("../JsonWebToken/JsonWebToken.js")


router.get('/cryptos/all', current.all)

    // Create a new crypto
router.post('/cryptos', current.create);

    // Delete a crypto
router.delete('/cryptos/:cmid', current.delete);


    // Delete a crypto in favorite   checkToken.checkSuperToken,
router.delete('/cryptos/:code/:userid', checkToken.checkSuperToken, current.del);

    //  get all crypto of table crypto with params money /cryptos?userid=
router.get('/cryptos', current.findAll);

    //  get one crypto information of crypto
router.get('/cryptos/:cmid', current.findOne);

     //  get one crypto and period
router.get('/cryptos/:cmid/history/:period', checkToken.checkToken, current.findOnes);


module.exports = router
