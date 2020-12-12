const Customer = require("../models/users.model.js");
var CryptoJS = require("crypto-js");
const passConfig = require("../config/password.config.js");
const checkToken = require("../JsonWebToken/JsonWebToken.js")

var emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;


function isEmailValid(email) {
    if (!email)
        return false;

    if (email.length > 254)
        return false;

    var valid = emailRegex.test(email);
    if (!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if (parts[0].length > 64)
        return false;

    var domainParts = parts[1].split(".");
    if (domainParts.some(function (part) {
        return part.length > 63;
    }))
        return false;

    return true;
}

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    else{
        if (req.body.username == '' || req.body.email == '' || req.body.password === '') {
            console.log("invalid data");
            res.status(204).send({message: "data invalid!"}, null);
            return;
        }
        if (!isEmailValid(req.body.email)) {
            console.log("invalid email");
            res.status(204).send({message: "email invalid!"}, null);
            return;
        }

        // Create a Customer
        const customer = new Customer({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            current: 1
        });
        // Save Customer in the database
        Customer.create(customer, (err, data) => {
            if (err)
                res.status(203).send({
                    message:
                        err.message || "Some error occurred while creating the user."
                });
            // else res.send(data);
            else {
                res.send(data);
            }
        });
    }
};

exports.login = (req, res, next) => {
    if (!isEmailValid(req.body.email)) {
        console.log("invalid email");
        res.status(204).send({message: "invalid email format !"});
        return;
    }
    Customer.findOne(req.body.email, function (customer) {
        console.log("ici")
        if (customer === null) {
            res.status(204).json({message: 'Utilisateur non trouvé !'});
            return;
        }
        var bytes  = CryptoJS.AES.decrypt(customer.password, passConfig.KEY);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);

        if (req.body.password === originalText) {
            checkToken.sendToken(req, res);
        } else {
            res.status(208).json({message: "bad password"})
        }
    })

};

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Customer.updateById(
        req.params.userId,
        new Customer(req.body, req.params.userId),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found user with id ${req.params.userId}.`
                    });
                } else {
                    res.status(404).send({
                        message: "Error updating user with id " + req.params.userId
                    });
                }
            } else res.send(data);
        }
    );
}; 
