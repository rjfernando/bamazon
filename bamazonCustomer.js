var mysql = require("mysql");
var inquirer = require("inquirer");

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
    // console.log("connected as id " + connection.threadId);
    // startOrder();
});

function startOrder() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) {
            console.log(err);
        }
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + "| " + res[i].stock_quanity);
            console.log("------------------------------------------------------------");
        } 
    
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
                name: "quanity",
                type: "input",
                message: "How many units would you like for this product?",
                validate: function(value){
                    if (isNaN(value)=== false){
                        return true;
                    }
                    return false;
                }

        }]).then(function(answer){
            for (var i = 0; i < res.length; i++){
                if (res[i].id === parseInt(answer.item))
                    stock(parseInt(answer.item), answer.quanity);
            }
        }); 
    });
}

function stock(id, quanity){
    connection.query("SELECT * FROM products WHERE ?", {id: id}, function(err,res){
        if (err){
            console.log(err);
        }
        if (res[0].stock_quanity <= 0){
            console.log("Insufficient quanity!");
        } else {
            updateQuanity(id, quanity);
        }
    });
}


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

function restart() {
    inquirer.prompt([{
        type: "confirm",
        message: "Add more items?",
        name: "confirm",
        default: true
    }]).then(function(answer) {
        if (answer.confirm === false){
            console.log("YOUR ORDER WAS PLACED! THANK YOU!");
        }
        if (answer.confirm === true){
            startOrder();  
        } else {
            connection.end();
        }
    });
}
startOrder();



    