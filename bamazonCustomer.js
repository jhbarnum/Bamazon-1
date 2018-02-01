// ==========  Bamazon Node and MySQL App | Composed by John Kim | University of Richmond  ======================

//      Required Dependencies
require('dotenv').config();
var inquirer = require('inquirer');             // Inquirer node package
var prompt = require('prompt');                 // Prompt node package 
var mysql = require('mysql');                   // MySQL node package
var validEntry = require('./validEntry.js');
var oneCanNeverRemember = require('./keys.js');
//var colors = require('colors/safe');          // If time available, add fancy colors

var connection = mysql.createConnection({       // MySQL Database parameters
    host: "localhost",
    port: 3306,
    user: "root",                               // Username
    password: process.env.password,             // password          
    database: "Bamazon"
});

connection.connect(function(err) {         // Connect to Database
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

// showUserInventory retrieves the available inventory from the db and dkisplays on command line
function showUserInventory() {

	queryInputQuantity = 'SELECT * FROM products';              	// Construct the db query string

	connection.query(queryInputQuantity, function(err, data) {  	// Make the db query
		if (err) throw err;

		console.log('Welcome to Bamazon');
		console.log('Please check out our novelty items.');
		console.log('-----------------------------------\n');
		console.log('Item ID # |        Product Name          |      Department    | Price $');
		console.log('---------------------------------------------------------------------\n');

		var stringOutput = '';
		for (var i = 0; i < data.length; i++) {

			stringOutput = '';
			stringOutput += '   # ' + data[i].item_id + '    |   ';
			stringOutput += data[i].product_name + '  |  ';
			stringOutput += data[i].department_name + '  |  ';
			stringOutput += '$' + data[i].price + '\n';

			console.log(stringOutput);
		}

	  	console.log('---------------------------------------------------------------------\n');

	  	confirmPurchase();    	               	//Prompt the user for item/quantity they would like to purchase
	})
}

function confirmPurchase() {                    // confirmPurchase Prompts for both item & quantity 

	inquirer.prompt([                         	// Prompt the user to select an item
		{
			type: 'input',
			name: 'item_id',
			message: 'Please select the purchasing Item ID #:',
			validate: validEntry,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'Quantity?',
			validate: validEntry,
			filter: Number
		}
	]).then(function(input) {

		var item = input.item_id;
		var quantity = input.quantity;

		var queryInputQuantity = 'SELECT * FROM products WHERE ?';   		// Query db to check both item_ID & quantity is valid

		connection.query(queryInputQuantity, {item_id: item}, function(err, data) {
			if (err) throw err;                   // Error check

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please reselect a valid Item ID.'); // User input check
				showUserInventory();

			} else {
				var productInfo = data[0];

				if (quantity <= productInfo.stock_quantity) {           				// Validate requested quantity by user
					console.log('Congratulations, the product you requested is available! Order submitted!');

									// Construct the updating query string
					var updateQueryInputQuantity = 'UPDATE products SET stock_quantity = ' + (productInfo.stock_quantity - quantity) + ' WHERE item_id = ' + item;

					connection.query(updateQueryInputQuantity, function(err, data) {  	// Update the inventory
						if (err) throw err;

						console.log('Your order will soon dispatch! Your total is $' + productInfo.price * quantity);
						console.log('Your patronage is appreciated!');
						console.log("\n---------------------------------------------------------------------\n");

						connection.end();                   						   // Terminate db connection
					})
				} else {
					console.log('Sorry, the quantity of the product is not available.');
					console.log('Please resubmit your order.');
					console.log('\n---------------------------------------------------------------------\n');

					showUserInventory();                                               // Reverts user back to inventory
				}
			}
		})
	})
}

function executeBamazon() {   // This runs main application logic
	showUserInventory();  // Display the available inventory
}

executeBamazon();             // Run the app


