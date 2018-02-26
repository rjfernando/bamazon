var mysql = require("mysql");
var inquirer = require("inquirer");
// var table = require('cli-table');
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
    connection.end();
}

function lowInventory(){
    var lowInvList = [];
    connection.query("SELECT * FROM products", function(err, res) {
        if (err){
            console.log(err);
        }
        for (var i = 0; i < res.length; i++) {
            // console.log(res);
            if (res[i].stock_quanity <= 5) {
                lowInvList.push(res[i]);   
            }  
        }              
        for ( var i = 0 ; i < lowInvList.length ; i++){
            console.log("Id: " + lowInvList[i].id + " | " + lowInvList[i].product_name + " | " + lowInvList[i].department_name + " | " + lowInvList[i].price + "| " + lowInvList[i].stock_quanity);
            console.log("------------------------------------------------------------");
        }
    })
    connection.end();
};

function addInventory(){
    var updatedAmount;
    var  newInventory;
    
    connection.query("SELECT * FROM products", function(err, res){
        if (err){
            console.log(err);
        }
        inquirer.prompt([{
            name: "productId",
            type: "input",
            message: "What is the Id of the product you would like to restock?"
        }, {
            name: "numAdd",
            type: "input",
            message: "How many do you want to add?" 
        
        }]).then(function(answer){
            for (var i = 0; i < res.length; i++) {
                if (res[i].id === answer.updatedAmount) {
                    updatedAmount = res[i];
                    newInventory = parseInt(res[i].stock_quanity) + parseInt(answer.numAdd);
                    console.log(newInventory);
                }
            }
        
            connection.query("UPDATE products SET ? WHERE ?", [{id: answer.productId},{stock_quanity: newInventory}], function(err, res){
            
            if (err){
                console.log(err);
            }
                console.log("Change has been updated");
            })
            connection.end();
        })
    })
};

function addProduct(){
    connection.query("SELECT * FROM products", function(err, res){
        if (err){
            console.log(err);
        }
        inquirer.prompt([{
            name: "product_name",
            type: "input",
            message: "What is the product name?"
        }, {
            name: "department_name",
            type: "input",
            message: "What department does this item belong to?"
        }, {
            name: "price",
            type: "input",
            message: "What is the price of the product?"
        }, {
            name: "stock_quanity",
            type: "input",
            message: "How many units?"
    
        }]).then(function(answer){
            connection.query("INSERT INTO products SET ?", {product_name: answer.product_name, department_name: answer.department_name, price: answer.price, stock_quanity: answer.stock_quanity}, function(err){
                if (err){
                    console.log(err);
                }
                console.log("Your product was added successfully!");
            })   
            
            connection.end();
        })
    })
};

