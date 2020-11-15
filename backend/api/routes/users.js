var express = require('express');
var router = express.Router();
const sql = require("../db.js");


/* GET users listing. */
router.get('/users', function(req, res, next) {

    res.json({message : "Bienvenue sur  API ", methode : req.method});
});

module.exports = router;
