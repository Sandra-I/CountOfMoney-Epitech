const Customer = require("../models/users.model.js");
const checkToken = require("../JsonWebToken/JsonWebToken.js")
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
            password: hash,
            current: 1
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

//get info of user
exports.profile = (req, res) => {
    user = req.params.id;
    Customer.profiles(user, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found user with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving user with id " + req.params.id
                });
            }
        } else {
            console.log("master: ", data)
            res.send(data)
        };
    })
}

// Update a user identified by the userId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    id = req.params.id;
    user = req.body;
    // new Customer(req.body, req.params.userId),
    Customer.updateById(id, user, (err, data) => {
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
            } else res.send(data);
        }
    );
};


exports.createAdmin = async (req, res) => {
    let hash = await argon2.hash(process.env.DEFAULT_ADMIN_PASSWORD)

    Customer.findAdmin((err, data) => {
        if (err) {
            res.status(500).send({message: err.message});
        }
        else if (!data) {
            if (process.env.DEFAULT_ADMIN_USERNAME === undefined || process.env.DEFAULT_ADMIN_EMAIL === undefined || process.env.DEFAULT_ADMIN_PASSWORD === undefined) {
                res.status(400).send({
                    message: "Received data is invalid, some fields are missing in environment!"
                });
                return;
            }
            else if (!isEmailValid(process.env.DEFAULT_ADMIN_EMAIL)) {
                res.status(400).send({
                    message: "Environment email address is invalid."
                });
                return;
            }
            else if (process.env.DEFAULT_ADMIN_PASSWORD.length < 12) {
                res.status(400).send({
                    message: "Environment password must be at least 12 characters."
                });
                return;
            }

            let customer = new Customer({
                username: process.env.DEFAULT_ADMIN_USERNAME,
                email: process.env.DEFAULT_ADMIN_EMAIL,
                password: hash,
            });

            customer["isadmin"] = 1

            Customer.create(customer, (err) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the admin account."
                    });
                }
                else {
                    res.send({
                        message: "Admin account successfully created with credentials specified in environment."
                    });
                }
            });
        }
        else {
            res.status(404).send({
                "message": "Not Found",
                "error": {
                    "message": "Not Found"
                }
            })
        }
    })
};
