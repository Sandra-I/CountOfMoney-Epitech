const sql = require("../db.js");

const Favorite = function (favorite, id) {
    this.fullname = favorite.fullname;
    this.code = favorite.code;
    this.imageurl = favorite.imageurl;
    this.user = favorite.user;
};

Favorite.favorites = (user, result) => {
    sql.query(`SELECT * FROM favorites WHERE user = ?`, user, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            let ress = [];
            console.log("found user: ", res[0].code);
            for (let i = 0; i < res.length; i++) {
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

Favorite.selectCurrent = (user, result) => {
    console.log("sandrepppp: ", user)
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

Favorite.select = (code, result) => {
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


Favorite.adds = (newCrypto, result) => {
    sql.query("INSERT INTO favorites SET ?", newCrypto, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created crypto: ", { id: res.insertId, ...newCrypto });
        result(null, { id: res.insertId, ...newCrypto });
    });
};

module.exports = Favorite;