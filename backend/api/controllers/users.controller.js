const Customer = require("../models/users.model.js");
let CryptoJS = require("crypto-js");
const passConfig = require("../config/password.config.js");

let emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;


function isEmailValid(email) {
    if (!email)
        return false;

    if (email.length > 254)
        return false;

    let valid = emailRegex.test(email);
    if (!valid)
        return false;

    // Further checking of some things regex can't handle
    let parts = email.split("@");
    if (parts[0].length > 64)
        return false;

    let domainParts = parts[1].split(".");
    return !domainParts.some(function (part) {
        return part.length > 63;
    });
}

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    else {
        if (req.body.username == null || req.body.email == null || req.body.password == null) {
            res.status(400).send({
                message: "Received data is invalid, some fields are missing!"
            });
            return;
        }
        else if (!isEmailValid(req.body.email)) {
            res.status(400).send({
                message: "Email address is invalid."
            });
            return;
        }
        else if (req.body.password.length < 8) {
            res.status(400).send({
                message: "Password must be at least 8 characters."
            });
            return;
        }

        // Create a Customer
        const customer = new Customer({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });

        // Save Customer in the database
        Customer.create(customer, (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the user."
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
        res.status(400).send({message: "invalid email format !"});
        return;
    }
    Customer.findOne(req.body.email, function (customer) {
        if (customer === null) {
            res.status(400).json({message: 'Utilisateur non trouvé !'});
            return;
        }
        let bytes = CryptoJS.AES.decrypt(customer.password, passConfig.KEY);
        let originalText = bytes.toString(CryptoJS.enc.Utf8);

        if (req.body.password === originalText) {
            next();
        } else {
            res.status(400).json({message: "bad password"})
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
                    res.status(500).send({
                        message: "Error updating user with id " + req.params.userId
                    });
                }
            } else res.send(data);
        }
    );
};
