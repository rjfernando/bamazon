var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");


//creating a connection to database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: "Music6247",
    database: "bamazon_db",
});

//getting connected to the database
connection.connect(function (err) {
    if (err) {
        console.log(err);
    }    
});

//cli-table for product list
var table = new Table({
    head: ["Id", "Product", "Department", "Price", "Stock Quantity"],
    // colWidths: [100, 200]
});

//start the order and list the items available for purchase
function startOrder() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            console.log(err);
        }
        for (var i = 0; i < res.length; i++) {
            // console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + "| " + res[i].stock_quanity);
            // console.log("------------------------------------------------------------");
            table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quanity]);
        }
        console.log("------------------------------------------------------------------"); 
        console.log(table.toString());

        //prompts user to select ID of the item their looking to purchase
        inquirer.prompt([{
                name: "item",
                type: "input",
                message: "What is the ID of the product you're looking to purchase?",
                validate: function(value){
                    if (isNaN(value)=== false){
                        return true;
                    }
                    return false;
                }
            },{
                //How many units does the customer want of that item selected
                name: "quanity",
                type: "input",
                message: "How many units would you like for this product?",
                validate: function(value){
                    if (isNaN(value)=== false){
                        return true;
                    }
                    return false;
                }
        //goes through the item list and parses out the selected item by ID
        }]).then(function(answer){
            for (var i = 0; i < res.length; i++){
                if (res[i].id === parseInt(answer.item))
                    stock(parseInt(answer.item), answer.quanity);
            }
        }); 
    });
}

//checks to see if the item is in stock and updates the stock quanity and if not in stock it informs customer insufficient quanity
function stock(id, quanity){
    connection.query("SELECT * FROM products WHERE ?", {id: id}, function(err,res){
        if (err){
            console.log(err);
        }
        if (res[0].stock_quanity <= 0){
            console.log("*******Insufficient Quanity!**********");
            console.log("PLEASE CHOOSE ANOTHER ITEM");
            delay();
        } else {
            updateQuanity(id, quanity);
            
        }
    });
}

// set a delay to list items again after customer is informed insufficient quanity 
function delay() {
    setTimeout(function(){ 
        startOrder(); }, 4000);
}

//confirms cost of the item select by how many units selected
function confirmCost(id, quanity) {
    connection.query("SELECT * FROM products WHERE ?", {id: id}, function(err, response) {
        if (err){
            console.log(err);
        }

        var totalCost = response[0].price * quanity;
        console.log("Total cost is $ " + totalCost);

        restart();
    });
}
// updates the stock quanity in the database as customer make their purhase
function updateQuanity(id, quanity){
    connection.query("SELECT * FROM products WHERE ?", {id: id}, function(err, res){
        if (err){
            console.log(err);
        }
        
        var newQuanity = res[0].stock_quanity - quanity;
            if (newQuanity < 0)
                newQuanity = 0;
    
    connection.query("UPDATE products SET ? WHERE ?", [{stock_quanity: newQuanity},{id: id}], function(err, res){
        if (err){
            console.log(err);
        }
        confirmCost(id, quanity);
    });
});
}

//after selecting items and quanity it ask customers if they want to add more items if not then their order is placed
function restart() {
    inquirer.prompt([{
        
        type: "confirm",
        message: "Add more items?",
        name: "confirm",
        default: true
    
    }]).then(function(answer) {
        if (answer.confirm === false){
            console.log("*********YOUR ORDER HAS BEEN PLACED!**********");
            console.log("----------------------------------------------");
        }
        if (answer.confirm === true){
            startOrder();  
        } else {
            connection.end();
        }
    });
}

startOrder();