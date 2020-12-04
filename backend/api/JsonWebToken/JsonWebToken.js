const jwt = require('jsonwebtoken');
const secretConfig = require("../config/secret.config.js");

const db = require("../db.js");

exports.sendToken = (req, res, next) => {
    const cookieConfig = {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24)),
    };
    db.query(`SELECT * FROM users WHERE email = '${req.body.email}'`, function (err, result) { //TODO: requêtes préparées
        if (err) {
            res.status(500).send({
                error: "An error has occured."
            })
        } else {
            if (result[0]) {
                const token = jwt.sign({
                    user: req.body.username,
                    email: req.body.email,
                    isadmin: result[0].isadmin,
                    id: result[0].id
                }, secretConfig.secret, {expiresIn: "1h"});
                res.cookie('cookie', token, cookieConfig);
                let user = result[0]
                delete user.password
                res.status(200).send(user)
                db.query(`update users set token = '${token}' where id = ${result[0].id}`)
            } else {
                res.status(400).send({
                    error: "Please specify the profile email."
                })
            }
        }
    })
}

exports.checkToken = (req, res, next) => {
    const cookies = req.cookies;
    let token = cookies.cookie
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secretConfig.secret, function (err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                res.status(200).send({success: "success"})
            }
        });
    }
}

exports.logout = (req, res, next) => {
    const cookieConfig = {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 365)),
    };
    res.cookie('cookie', "", cookieConfig);
    res.send("log out")
}
