const sql = require("../db.js");

const Crypto = function (crypto, id) {
    this.fullname = crypto.fullname;
    this.code = crypto.code;
    this.imageurl = crypto.imageurl;
};

Crypto.creat = (newCrypto, result) => {
    sql.query("INSERT INTO cryptos SET ?", newCrypto, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created crypto: ", {id: res.insertId, ...newCrypto});
        result(null, {id: res.insertId, ...newCrypto});
    });
};

Crypto.remove = (id, result) => {
    sql.query("DELETE FROM cryptos WHERE id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({kind: "not_found"}, null);
            return;
        }

        result(null, res);
    });
};

Crypto.findall = (result) => {
    sql.query(`SELECT * FROM cryptos`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
          let ress = [];
        console.log("found user: ", res[0].code);
        for(let i=0; i < res.length; i++){
            ress.push(res[i].code)
        }
        console.log("code: ", ress)
        result(null, ress);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

  Crypto.findById = (id, result) => {
    sql.query(`SELECT * FROM cryptos WHERE id = '${id}'`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("found crypto: ", res[0]);
        result(null, res);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };
  
module.exports = Crypto;