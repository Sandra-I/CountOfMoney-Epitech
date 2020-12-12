const jwt = require('jsonwebtoken');
const { cookie } = require('request');
const secretConfig = require("../config/secret.config.js");

const db = require("../db.js");

exports.sendToken = (req, res, next) => {
    console.log("sendToken")
    const cookieConfig = {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 365)),
    };
    console.log(req.body)
    db.query(`select * from users where email = '${req.body.email}'`, function (err, result) {
        if (err) {
            res.status(401).json({error: "error with email"})
        } else {
            const token = jwt.sign({
                username: result[0].username,
                email: result[0].email,
                isadmin: result[0].isadmin,
                id: result[0].id
            }, secretConfig.secret, {expiresIn: "1h"});
            res.cookie('cookie', token, cookieConfig);
            var user = result[0]
            delete user.password
            delete user.token
            user.token = token
            console.log(user)
            res.status(200).json(user)
            db.query(`update users set token = '${token}' where id = ${result[0].id}`)
        }
    })
}

exports.checkToken = (req, res, next) => {
    console.log("checkToken")
    const cookies = req.cookies;
    var token = cookies.cookie
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secretConfig.secret, function (err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                res.status(200).json({success: "success"})
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

exports.checkSuperRight = (req, res, next) => {
    console.log("checkRightOrId")
    console.log("toto: ", req.cookies)
    const cookies = req.cookies;
    var token = cookies.cookie
    //var token = req.query.token
    console.log("token: " + token);
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        console.log('tooto')
        jwt.verify(token, secretConfig.secret, function (err, decoded) {
            if (err) {
                console.log(err)
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                if (decoded.isadmin == 1) {
                    console.log("super")
                    next();
                } else {
                    res.status(403).send('Unauthorized: Invalid Right');
                }
            }
        });
    }
}

exports.checkSuperToken = (req, res, next) => {
    console.log("checkRightOrId")
    const cookies = req.cookies;
    var token = cookies.cookie
    //var token = req.query.token
    console.log("token: " + token);
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        console.log('tooto')
        jwt.verify(token, secretConfig.secret, function (err, decoded) {
            if (err) {
                console.log(err)
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                if (decoded.isadmin == 0) {
                    console.log("super")
                    next();
                } else {
                    res.status(403).send('Unauthorized: Invalid Right');
                }
            }
        });
    }
}