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
router.post('/register', customers.create);
// user login
router.post('/login', createAccountLimiter, customers.login, checkToken.sendToken);
// user update
router.get('/profile', checkToken.sendToken, customers.update);
// user logout
router.get('/logout', checkToken.logout);


module.exports = router