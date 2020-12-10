const jwt = require('jsonwebtoken');
const secretConfig = require("../config/secret.config.js");

const db = require("../db.js");

exports.sendToken = (req, res, next) => {
    console.log("sendToken")
    const cookieConfig = {
        httpOnly: true,
        secure: false,
        expires: new Date(Date.now() + (1000 * 60 * 60 * 24)),
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
    const cookies = req.cookies;
    console.log(req.body);
    var token = cookies.cookie;
    console.log("token: " + token);
    if (!token) {
        console.log("toktok");
        res.status(401).send('Unauthorized: No token provided');
    } else {
        console.log("toktok 2");
        jwt.verify(token, secretConfig.secret, function (err, decoded) {
            console.log("jwt verify in");
            if (err) {
                console.log("toktok 3");
                console.log(err)
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                console.log('here decoded '+ decoded.isadmin);
                if (decoded.isadmin == 1) {
                    next();
                } else {
                    res.status(403).send('Unauthorized: Invalid Right');
                }
            }
        });
    }
}