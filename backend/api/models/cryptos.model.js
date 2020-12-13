const sql = require("../db.js");

const Crypto = function (crypto, id) {
  this.fullname = crypto.fullname;
  this.code = crypto.code;
  this.imageurl = crypto.imageurl;
};

Crypto.creat = (newCrypto, result) => {
  sql.query("INSERT INTO cryptos SET ?", newCrypto, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    result(null, { id: res.insertId, ...newCrypto });
  });
};

Crypto.remove = (code, result) => {
  sql.query(`DELETE FROM cryptos WHERE code = ?`, code, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    } else {
      result(null, res);
    }
  });
  sql.query(`DELETE FROM favorites WHERE code = ?`, code, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // result({kind: "not_found"}, null);
      return;
    }
  });
};

Crypto.remov = (userid, code, result) => {
  sql.execute(`DELETE FROM favorites WHERE code = ? AND user = ?`, [code, userid], (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
}

Crypto.findall = (result) => {
  sql.query(`SELECT * FROM cryptos`, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      let ress = [];
      for (let i = 0; i < res.length; i++) {
        ress.push(res[i].code)
      }
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
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

Crypto.selectCurrent = (user, result) => {
  sql.query(`SELECT name FROM currents, users WHERE currents.id = users.current AND users.id = ?`, user, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0].name);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};



module.exports = Crypto;
