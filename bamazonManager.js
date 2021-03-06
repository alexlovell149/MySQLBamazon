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
// begining function that allows user to pick from a list of choices and set of prompts
// attached to each choice
var choice = function() {
    inquirer.prompt([{
        name: "action",
        type: "list",
        message: "What do you want to do?",
        choices: ["View Inventory", "Add to Inventory Stock", "Add a new Product", "Exit"]

    }]).then(function(answer) {
        switch (answer.action) {
            case "View Inventory":
                viewInv(function() {
                    choice();
                });
                break;

            case "Add to Inventory Stock":
                addToInv();
                break;


            case "Add a new Product":
                addToProd();
                break;

            case "Exit":
                connection.end();
                break;

        }
    });
}
// function for simply viewing the table
var viewInv = function(cb) {

    connection.query("SELECT * FROM products", function(err, results) {

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

        console.log(table.toString());
        console.log("----------------------------------");
        cb();


    });
}
// adding an item and how to select a speicific item witht the first prompt
var addToInv = function() {
    var items = [];
    connection.query("SELECT product_name FROM products", function(err, res) {
        if (err) throw err;
        // loop through the results in the products table
        for (var i = 0; i < res.length; i++) {
            items.push(res[i].product_name)
        }
        // ask user with checkoboxes with product name they want to add inventory to
        inquirer.prompt([{
            name: "additions",
            type: "checkbox",
            message: "Which product would you like to add inventory for",
            choices: items
            // if customer does not enter anythiing the get a message if not they are moved to next set of prompts
        }]).then(function(user) {
            if (user.additions.length === 0) {
                console.log("You didn't make a purchase!");
                choice();
            } else {
                addToInv2(user.additions);
            }
        });

    });

}

var addToInv2 = function(itemNames) {
    // sets item to 1st item of 1st element of array and removes that element from the array
    var item = itemNames.shift();
    var itemStock;
    // connection to mysql to call the stock quantity from the item
    connection.query("SELECT stock_quantity FROM products WHERE ?", {
        product_name: item
    }, function(err, res) {
    	// making the item stock equal to the zero index of stock quantity array and making it a number
        if (err) throw err;
        itemStock = res[0].stock_quantity;
        itemStock = parseInt(itemStock)
    });

    inquirer.prompt([{
        name: "number",
        type: "text",
        message: "How many " + item + " would you like to add?",
        // if they do not select a number return console.log statement
        validate: function(str) {
            if (isNaN(parseInt(str))) {
                console.log("Sorry not valid");
                return false;
            } else {
                return true;
            }
        }
    }]).then(function(user) {
        var number = user.number
        number = parseInt(number);
        // update database products to reflect new stock quantity
        connection.query("UPDATE products SET ? WHERE ?", [{
            stock_quantity: itemStock += number
        }, {
            product_name: item
        }], function(err) {

            if (err) throw err;
        });
        // run function again if items stayed in the array
        if (itemNames.length != 0) {
            addToInv2(itemNames);

        } else {
        	// if no more items update databse and go back to beginning
            console.log("Inventory updated.");
            choice();
        }
    });
}

function addToProd() {
    var departments = [];
    //select
    connection.query('SELECT department_name FROM products', function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            departments.push(res[i].department_name);
        }
    });
    //These are the prompts for adding products to the table
    inquirer.prompt([{
        name: "item",
        type: "text",
        message: "Enter your product name."
    }, {
        name: "department",
        type: "list",
        message: "Please choose the department you would like to add your product to.",
        choices: departments
    }, {
        name: "price",
        type: "text",
        message: "Enter the price for this product."
    }, {
        name: "stock",
        type: "text",
        message: "Enter the Stock Quantity for this item to be entered into current stock"
    }]).then(function(user) {
        // create item object with all of the user's choices
        var item = {
                product_name: user.item,
                department_name: user.department,
                price: user.price,
                stock_quantity: user.stock
            }
            //puts it into the products table
        connection.query('INSERT INTO products SET ?', item,
            function(err) {
                if (err) throw err;
                console.log(item.product_name + ' has been added successfully to your inventory.');
                //The prompts then start over from the beginning
                choice();
            });
    });
}


choice();
