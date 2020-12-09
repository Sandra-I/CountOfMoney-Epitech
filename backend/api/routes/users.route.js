let rateLimit = require("express-rate-limit");
const customers = require("../controllers/users.controller.js");
const checkToken = require("../JsonWebToken/JsonWebToken.js")

/*const { google } = require('googleapis');
const OAuth2Data = require('../google_key.json')
const CLIENT_ID = OAuth2Data.client.id;
const CLIENT_SECRET = OAuth2Data.client.secret;
const REDIRECT_URL = OAuth2Data.client.redirect

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
var authed = false;

app.get('/', (req, res) => {
  if (!authed) {
      // Generate an OAuth URL and redirect there
      const url = oAuth2Client.generateAuthUrl({
          access_type: 'offline',
          scope: 'https://www.googleapis.com/auth/gmail.readonly'
      });
      console.log(url)
      res.redirect(url);
  } else {
      const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
      gmail.users.labels.list({
          userId: 'me',
      }, (err, res) => {
          if (err) return console.log('The API returned an error: ' + err);
          const labels = res.data.labels;
          if (labels.length) {
              console.log('Labels:');
              labels.forEach((label) => {
                  console.log(`- ${label.name}`);
              });
          } else {
              console.log('No labels found.');
          }
      });
      res.send('Logged in')
  }
})

app.get('/auth/google/callback', function (req, res) {
  const code = req.query.code
  if (code) {
      // Get an access token based on our OAuth code
      oAuth2Client.getToken(code, function (err, tokens) {
          if (err) {
              console.log('Error authenticating')
              console.log(err);
          } else {
              console.log('Successfully authenticated');
              oAuth2Client.setCredentials(tokens);
              authed = true;
              res.redirect('/')
          }
      });
  }
}); */

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
app.post('/users/login', createAccountLimiter, customers.login, checkToken.sendToken,);
// user update
app.get('/users/profile', checkToken.sendToken, customers.update,);
// user logout
app.get('/users/logout', checkToken.logout);

// Delete a crypto
//app.delete('/cryptos/:cmid', customers.delete);


}