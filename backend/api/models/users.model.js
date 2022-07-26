const sql = require("../db.js");

// constructor
const Customer = function (customer, id) {
    this.username = customer.username;
    this.email = customer.email;
    this.password = customer.password;
    this.current = customer.current;
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

Customer.updateById = (id, user, result) => {
    sql.query("UPDATE users SET username = ?, email = ? WHERE id = ?",
        [user.username, user.email, id],
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
