const Customer = require("../models/users.model.js");
const argon2 = require("argon2")

let emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;


function isEmailValid(email) {
    if (!email || email.length > 254 || !emailRegex.test(email))
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

async function validatePassword(encryptedPass, passToValidate) {
    let result = await argon2.verify(encryptedPass, passToValidate)
    return result
}

// Create and Save a new user
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    else {
        if (req.body.username === undefined || req.body.email === undefined || req.body.password === undefined) {
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

        let hash = await argon2.hash(req.body.password)

        // Create a Customer
        const customer = new Customer({
            username: req.body.username,
            email: req.body.email,
            password: hash
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
        res.status(400).send({
            message: "Email address is invalid."
        });
        return;
    }
    Customer.findOne(req.body.email, function (customer) {
        if (customer === null) {
            res.status(401).send({
                message: 'User not found.'
            });
            return;
        }

        (async () => {
            if (await validatePassword(customer.password, req.body.password)) {
                next();
            } else {
                res.status(401).send({
                    message: "Wrong password."
                })
            }
        })()
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

    Customer.updateById(req.params.userId, new Customer(req.body, req.params.userId), (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: "No user found with id " + req.params.userId + "."
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating user with id " + req.params.userId + "."
                    });
                }
            } else res.send(data); //TODO: implémentation algo quand update fonctionnera
        }
    );
};
