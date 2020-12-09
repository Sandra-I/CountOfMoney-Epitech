const Crypto = require("../models/cryptos.model.js");
const request = require('request');

exports.all = (req, res) => {

    request('https://min-api.cryptocompare.com/data/all/coinlist?api_key=f25326a83d9c6bc40ab459c37a569a1b0d58fc05cb83f6139331c3c7dac78c3c', (error, response) => {
    if (error) {
        res.send(`Could not send request to API: ${error.message}`);
        return;
    }

    if (response.statusCode != 200) {
        res.send(`Expected status code 200 but received ${response.statusCode}.`);
        return;
    }
    console.log(response.body);
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
        const crypto = new Crypto ({
            fullname: req.body.fullname,
            code: req.body.code,
            imageurl: url + req.body.imageurl
        });
        console.log(crypto)
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
    id = req.params.cmid;
    console.log("id: ",id)
    Crypto.remove(id, (err, data) => {
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

exports.del = (req, res) => {
  console.log("coucou")
  code= req.params.code;
  userid = req.params.userid;
  console.log("code: ", code)
  console.log("userid: ", userid)
  Crypto.remov(userid, code, (err, data) => {
      if (err)
          res.status(203).send({
              message:
                   err.message || "Some error to delete crypto."
           });
      else {
          res.status(200).send("deleted crypto in favorite");
      }
  });
};

exports.findAll = (req, res) => {
    money = req.query.money
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
      } else{
          console.log("data: ", data)
        //res.send(data);
        request(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${data}&tsyms=${money}&api_key=f25326a83d9c6bc40ab459c37a569a1b0d58fc05cb83f6139331c3c7dac78c3c`, (error, response) => {
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
      } else res.send(data);
    });
  };

  exports.findOnes = (req, res) => {
    period = "histo" + req.params.period
    console.log(period)
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
        request(`https://min-api.cryptocompare.com/data/v2/${period}?fsym=${data[0].code}&tsym=USD&limit=10&api_key=f25326a83d9c6bc40ab459c37a569a1b0d58fc05cb83f6139331c3c7dac78c3c`, (error, response) => {
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
          //https://min-api.cryptocompare.com/data/v2/${period}?fsym=${data[0].code}&tsym=USD&limit=10&api_key=f25326a83d9c6bc40ab459c37a569a1b0d58fc05cb83f6139331c3c7dac78c3c
          //res.send(data);
      } 
    });
  };


  exports.add = (req, res) => {
    // Validate request
    
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    else {
      code = req.body.code;
      console.log(code)
      Crypto.select(code, (err, data) => {
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
      
    // Create a Crypto
        const crypto = new Crypto ({
            fullname: data[0].fullname,
            code: data[0].code,
            imageurl: data[0].imageurl
        });
        console.log(crypto)
    Crypto.adds(crypto, (err, data) => {
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
