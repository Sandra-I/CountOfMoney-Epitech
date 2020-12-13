const Favorite = require("../models/favorites.model.js");
const request = require('request');
const apiKey = process.env.CC_API_KEY


exports.add = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    else {
        code = req.body.code;
        Favorite.select(code, (err, data) => {
            if (err)
                res.status(203).send({
                    message:
                        err.message || "Some error occurred while creating the user."
                });
            if (!data) {
                res.status(400).send({
                    message: "Content can not be empty!"
                });
            }
            else {

                // Create a favorit
                const crypto = new Favorite({
                    fullname: data[0].fullname,
                    code: data[0].code,
                    imageurl: data[0].imageurl,
                    user: req.params.userid
                });
                Favorite.adds(crypto, (err, data) => {
                    if (err)
                        res.status(203).send({
                            message:
                                err.message || "Some error occurred while creating the user."
                        });
                    else {
                        res.send(data);
                    }
                });
            }
        })
    }

}


exports.favorite = (req, res) => {
    user = req.params.userid

    Favorite.favorites(user, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found crypto in the table.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving crypto with table "
                });
            }
        } else {
            const code = data;
            Favorite.selectCurrent(user, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found user with id ${user}.`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error retrieving user with id " + user
                        });
                    }
                } else {

                    money = data
                    request(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${code}&tsyms=${money}&api_key=${apiKey}`, (error, response) => {
                        if (error) {
                            res.send(`Could not send request to API: ${error.message}`);
                        }
                        if (response.statusCode != 200) {
                            res.send(`Expected status code 200 but received ${response.statusCode}.`);
                        }
                        res.send(response.body)
                    });
                }
            })
        }
    });
};
