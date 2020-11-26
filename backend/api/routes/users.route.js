let rateLimit = require("express-rate-limit");

const customers = require("../controllers/users.controller.js");
const checkToken = require("../JsonWebToken/JsonWebToken.js")

module.exports = app => {
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
app.post('/users/register', customers.create);
// user login
app.post('/users/login', createAccountLimiter, customers.login, checkToken.sendToken);
// user update
app.get('/users/profile', checkToken.sendToken, customers.update,);
// user logout
app.get('/users/logout', checkToken.logout);


}