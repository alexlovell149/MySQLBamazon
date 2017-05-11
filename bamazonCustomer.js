var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "BamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function(err, results) {
    if (err) throw err;

});


// function for customer to view table and make a purchase of a certain item by ID and certain amount
var choice = function() {

    connection.query("SELECT * FROM products", function(err, results) {
            if (err) throw err;

            // process for implementing the cli-table package in node
            var table = new Table({
                head: ["ID", "Product Name", "Department", "Price", "Stock Quantity"]
            });

            console.log("Here are the items available!");
            console.log("================================");

            for (var i = 0; i < results.length; i++) {
                table.push([results[i].item_id, results[i].product_name, results[i].department_name, results[i].price,
                    results[i].stock_quantity
                ]);
            }
            console.log("----------------------------------");
            // end process of implementing table in node for cli-table
            console.log(table.toString());

            inquirer.prompt([{
                        name: "item",
                        type: "input",
                        message: "What item(id) would you like to purchase?",
                        // make sure user input is a number
                        validate: function(value) {
                            if (isNaN(value) == false) {
                                return true;
                            } else {
                                return false;
                            }
                        }

                    }, {
                        name: "quantity",
                        type: "input",
                        message: "How many would you like to purchase?",
                        validate: function(value) {
                            if (isNaN(value) == false) {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    },
                

            ]).then(function(answer) {
            // have to subtract 1 since the header column counts as a row
            var chosenId = answer.item - 1
                // chosenproduct is the one the user picks and is put in an array
            var chosenProduct = results[chosenId]
                // the amount of that item the user picks
            var chosenStock = answer.quantity

            if (chosenStock < chosenProduct.stock_quantity) {
                console.log("Your total for " + "(" + chosenStock + ")" + chosenProduct.product_name + " is: " + "$" + chosenProduct.price * chosenStock);
                // bid was high enough, so update db, let the user know, and start over
                connection.query("UPDATE products SET ? WHERE ?", [{
                    stock_quantity: chosenProduct.stock_quantity - chosenStock
                }, {
                    item_id: chosenProduct.item_id
                }], function(error, res) {
                    console.log("Your order has been placed!");

                    choice();

                });

            } else {
                // bid wasn't high enough, so apologize and start over
                console.log("I'm sorry we seem to be out of stock");
            }


        });
    });

}

choice();
