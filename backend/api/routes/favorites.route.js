const current = require("../controllers/favorites.controller.js");

module.exports = app => {
    // Add a crypto in favorite
    app.post('/cryptos/:userid', current.add);

    // get all crypto in favorite of user
    app.get('/cryptos/user/:userid', current.favorite);

}