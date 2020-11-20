var express = require('express');
var router = express.Router();
var rateLimit = require("express-rate-limit");


const customers = require("../users/user.controller.js");
const checkToken = require("../JsonWebToken/JsonWebToken.js")


const createAccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 1 hour window
  max: 5, // start blocking after 5 requests
  message:
    "Please try again after 15 min"
});
/* GET home page. */
router.all('/', function(req, res, next) {
  res.json({message : "Bienvenue sur  API ", methode : req.method});
});
// Create a new user
router.post('/users/register', customers.create);
// user login
router.post('/users/login', createAccountLimiter, customers.login, checkToken.sendToken);
// user update
router.get('/users/profile', checkToken.sendToken, customers.update,);
// user logout
router.get('/users/logout', checkToken.logout);


module.exports = router;
