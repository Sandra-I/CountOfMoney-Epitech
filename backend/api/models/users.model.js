const sql = require("../db.js");

// constructor
const Customer = function (customer, id) {
    this.username = customer.username;
    this.email = customer.email;
    this.password = customer.password;
};

Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO users SET ?", newCustomer, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, {id: res.insertId, ...newCustomer});
    });
};

Customer.findOne = (email, result) => {

    sql.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (res.length > 0) {
            result(res[0]);
            return;
        }
        result(null);

    });
}

Customer.updateById = (id, customer, result) => {
    if (req.body.username === undefined || req.body.email === undefined || req.body.password === undefined) {
        result({
            message: "Received data is invalid, some fields are missing!"
        });
        return;
    }
    if (!isEmailValid(customer.email)) {
        result({
            message: "Email address is invalid."
        });
        return;
    }
    sql.query(
        "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?",
        [customer.username, customer.email, customer.password, id],
        (err, res) => {
            if (err) {
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found Customer with the id
                result({kind: "not_found"}, null);
                return;
            }

            result(null, {id: id, ...customer});
        }
    );
};

Customer.findAdmin = (result) => {

    sql.query(`SELECT * FROM users WHERE isadmin = TRUE`, (err, res) => {
        if (err) {
            result(err, null);
            return;
        } else if (res.length > 0) {
            result(null, res);
            return;
        }
        result(null);

    });
}

module.exports = Customer;
