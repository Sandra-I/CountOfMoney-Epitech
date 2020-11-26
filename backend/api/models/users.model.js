const sql = require("../db.js");
let CryptoJS = require("crypto-js");
const passConfig = require("../config/password.config.js");


// constructor
const Customer = function (customer, id) {
    this.username = customer.username;
    this.email = customer.email;
    this.password = CryptoJS.AES.encrypt(customer.password, passConfig.KEY).toString();
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

Customer.updateById = (id, customer, result) => {
    if (customer.username == '' || customer.email == '' || customer.password === '') {
        console.log("invalid data");
        result({message: "data invalid!"}, null);
        return;
    }
    if (!isEmailValid(customer.email)) {
        console.log("invalid email");
        result({message: "email invalid!"}, null);
        return;
    }
    sql.query(
        "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?",
        [customer.username, customer.email, customer.password, id],
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

module.exports = Customer;