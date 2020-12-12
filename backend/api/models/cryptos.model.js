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
  console.log("remove")
  sql.query(`SELECT * FROM cryptos WHERE id = ?`, id, (err, res) => {
    console.log("voici")
    if (err) {
      console.log("erreur")
      console.log("error: ", err);
      result(null, err);
    }
    if (res.length){
      console.log(res)
      cod = res[0].code
      console.log("cod: ", cod)
      sql.query(`DELETE FROM favorites WHERE code = ?`, cod, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        if (res.affectedRows == 0) {
         // result({kind: "not_found"}, null);
          return;
        }
      });
    }
  });
  sql.query(`DELETE FROM cryptos WHERE id = ?`, id, (err, res) => {
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

Crypto.remov = (userid, code, result) => {
  console.log("remov")
  console.log("coder: ", code)
  console.log("useridr: ", userid)
  sql.execute(`DELETE FROM favorites WHERE code = ? AND user = ?`, [code, userid], (err, res) => {
    console.log("toto")
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
}

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

  Crypto.select = (code, result) => {
    sql.query(`SELECT * FROM cryptos WHERE code = ?`, code, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("code: ", res)
        result(null, res);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };
  Crypto.selectCurrent = (user, result) => {
    console.log("sandre: ", user)
    sql.query(`SELECT name FROM currents, users WHERE currents.id = users.current AND users.id = ?`, user, (err, res) => {
      console.log("sandra")
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
        console.log("san")
        console.log("user: ", res)
        result(null, res[0].name);
        return;
      }
  
      // not found Customer with the id
      result({ kind: "not_found" }, null);
    });
  };

  Crypto.adds = (newCrypto, result) => {
    sql.query("INSERT INTO favorites SET ?", newCrypto, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created crypto: ", {id: res.insertId, ...newCrypto});
        result(null, {id: res.insertId, ...newCrypto});
    });
};
  
module.exports = Crypto;