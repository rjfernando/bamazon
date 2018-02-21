var mysql = require("mysql");
var inquirer = require("inquirer");

//creating a connection to database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: "Music6247",
    database: "bamazon_db",
});

connection.connect(function (err) {
    if (err) {
        console.log(err);
    }
    runSearch();
    lowInventory();   
});

function runSearch(){
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
            "View Low Inventory",
            "Add to Inventory",
            "Add new Product",
        ]
}).then(function(answer){
    switch (answer.action){
        case "View Products for Sale":
            viewProducts();
            break;
        
        case "View Low Inventory":
            lowInventory();
            break;
        
        case "Add to Inventory":
            addInventory();
            break;
         
        case "Add new Product":
            addProduct();
            break;
        }
    });
}

function viewProducts(){
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            console.log(err);
        }
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + "| " + res[i].stock_quanity);
            console.log("------------------------------------------------------------");
        } 
    });
}

function lowInventory(answer){

    var query = "SELECT stock_quanity, FROM products WHERE position BETWEEN ? AND ?";
    connection.query(query, "SELECT stock_quanity, FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + "| " + res[i].stock_quanity);
        }
    });
}
