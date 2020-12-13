let rateLimit = require("express-rate-limit");
let router = require('express').Router();

const customers = require("../controllers/users.controller.js");
const checkToken = require("../JsonWebToken/JsonWebToken.js")

// Limiter function
const createAccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min window
  max: 5, // start blocking after 5 requests
  message:
      "Please try again after 15 min"
});

//app.all('/', function(req, res, next) {
//  res.json({message : "Bienvenue sur  API ", methode : req.method});
//});

// Create a new user
router.post('/users/register', customers.create);
// user update (not working)
//router.post('/update', customers.update);
// user login
router.post('/users/login', createAccountLimiter, customers.login, checkToken.sendToken);
// user update
router.get('/users/profile', checkToken.sendToken, customers.update);
// user logout
router.get('/users/logout', checkToken.logout);
// admin setup
router.get('/users/setup', customers.createAdmin)


module.exports = router
