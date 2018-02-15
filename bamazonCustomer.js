var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "Localhost",
    port: 3306,
    user: root,
    password: "Music6247",
    database: "bamazon_db",
});

connection.connect(function(err) {
    if (err) {
        console.log(err);
    }
    console.log("connected as id " + connection.threadId);
    listAllproducts();
  });

  function listAllproducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err){
            console.log(err);
        }
        for (var i = 0; i < res.length; i++) {
        console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + "|" + res[i].stock_quanity);
        }
      console.log("-----------------------------------");
    });
}