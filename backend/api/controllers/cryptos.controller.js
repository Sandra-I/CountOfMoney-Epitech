const Crypto = require("../models/cryptos.model.js");
const request = require('request');
const apiKey = process.env.CC_API_KEY

exports.all = (req, res) => {
  request(`https://min-api.cryptocompare.com/data/all/coinlist?api_key=${apiKey}`, (error, response) => {
    if (error) {
      res.send(`Could not send request to API: ${error.message}`);
      return;
    }

    if (response.statusCode != 200) {
      res.send(`Expected status code 200 but received ${response.statusCode}.`);
      return;
    }
    res.send(response.body)
  });
}

exports.create = (req, res) => {
  // Validate request

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  else {

    // Create a Crypto
    const url = "https://min-api.cryptocompare.com"
    const crypto = new Crypto({
      fullname: req.body.fullname,
      code: req.body.code,
      imageurl: url + req.body.imageurl
    });
    Crypto.creat(crypto, (err, data) => {
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

}

exports.delete = (req, res) => {
  code = req.params.cmid;
  Crypto.remove(code, (err, data) => {
    if (err)
      res.status(203).send({
        message:
          err.message || "Some error to delete crypto."
      });
    else {
      res.status(200).send("deleted crypto");
    }
  });
};

exports.findAll = (req, res) => {
  Crypto.findall((err, data) => {
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
      user = req.query.userid
      if (user) {
        if (user == "null") {
          money = "EUR";
        } else {
          Crypto.selectCurrent(user, (err, data) => {
            if (err) {
              if (err.kind === "not_found") {
                res.status(404).send({
                  message: `Not found user with id ${req.params.cmid}.`
                });
              } else {
                res.status(500).send({
                  message: "Error retrieving user with id " + req.params.cmid
                });
              }
            } else {
              money = data[0]
            }
          })
          //money = currencie
        }
      }
      else {
        money = "EUR";
      }
      request(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${data}&tsyms=${money}&api_key=${apiKey}`, (error, response) => {
        if (error) {
          res.send(`Could not send request to API: ${error.message}`);
        }
        if (response.statusCode != 200) {
          res.send(`Expected status code 200 but received ${response.statusCode}.`);
        }
        res.send(response.body)
      });
    }
  });
};


exports.findOne = (req, res) => {
  code = req.params.cmid
  // Crypto.findById(code, (err, data) => {
  //   if (err) {
  //     if (err.kind === "not_found") {
  //       res.status(404).send({
  //         message: `Not found user with id ${req.params.cmid}.`
  //       });
  //     } else {
  //       res.status(500).send({
  //         message: "Error retrieving user with id " + req.params.cmid
  //       });
  //     }
  //   } else res.send(data);
  // });
};

exports.findOnes = (req, res) => {
  period = "histo" + req.params.period
  Crypto.findById(req.params.cmid, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.cmid}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with id " + req.params.cmid
        });
      }
    } else {
      // request in cryptocompore
      request(`https://min-api.cryptocompare.com/data/v2/${period}?fsym=${data[0].code}&tsym=USD&limit=10&api_key=${apiKey}`, (error, response) => {
        if (error) {
          res.send(`Could not send request to API: ${error.message}`);
          return;
        }
        if (response.statusCode != 200) {
          res.send(`Expected status code 200 but received ${response.statusCode}.`);
          return;
        }
        res.send(response.body)
      });
    }
  });
};
