const sql = require("../db.js");
let CryptoJS = require("crypto-js");
const passConfig = require("../config/password.config.js");


// constructor
const Customer = function (customer, id) {
    this.username = customer.username;
    this.email = customer.email;
    this.password = CryptoJS.AES.encrypt(customer.password, passConfig.KEY).toString();
    this.current = customer.current
};

Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO users SET ?", newCustomer, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", {id: res.insertId, ...newCustomer});
        result(null, {id: res.insertId, ...newCustomer});
    });
};

Customer.findOne = (email, result) => {
    sql.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length > 0) {
            console.log("found user: ", res[0]);
            result(res[0]);
            return;
        }
        result(null);

    });
}

Customer.updateById = (id, user, result) => {
    sql.query("UPDATE users SET username = ?, email = ?, current = ? WHERE id = ?",
        [user.username, user.email, user.password, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Customer with the id
                result({kind: "not_found"}, null);
                return;
            }

            console.log("updated user: ", {id: id, ...customer});
            result(null, {id: id, ...customer});
        }
    );
};
Customer.profiles = (user, result) => {
    let info
    sql.query(`SELECT id, username, email, current FROM users WHERE id= ?`, user, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (res.length == 0) {
            console.log("totot: ", res[0])

            //result(null, res[0]);
            result({ kind: "not_found" }, null);
        }else{
            console.log("totot: ", res[0])
            info = res[0]
            sql.query(`SELECT * FROM currents`, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                if (res.length > 0) {
                    console.log("sandra: ", res)
                    info.currents = res
                    console.log("sandra: ", info)
                    result(null, info);
                    return;
                }
                result({ kind: "not_found" }, null);
            });
        }
    });
}
module.exports = Customer;