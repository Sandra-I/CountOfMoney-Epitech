let router = require('express').Router()
const current = require("../controllers/favorites.controller.js");


    // Add a crypto in favorite
router.post('/cryptos/:userid', current.add);

    // get all crypto in favorite of user
router.get('/cryptos/user/:userid', current.favorite);

router.delete('/cryptos/:code/:userid', current.del);

module.exports = router
