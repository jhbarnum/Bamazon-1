//         Bamazon Node and MySQL App | Composed by John Kim | University of Richmond 

//      Required Dependencies
require('dotenv').config();
var inquirer = require('inquirer');                          // Inquirer node package
var prompt = require('prompt');                              // Prompt node package 
var mysql = require('mysql');                                // MySQL node package
var validEntry = require('./validEntry.js');                 // User module package
var oneCanNeverRemember = require('./keys.js');              // Password package
var validQuantityInput = require('./validQuantityInput.js'); // Manager module package
//var colors = require('colors/safe');          // If time available, add fancy colors

var connection = mysql.createConnection({       // MySQL Database parameters
    host: "localhost",
    port: 3306,
    user: "root",                               // Username
    password: process.env.password,             // password          
    database: "Bamazon"
});

connection.connect(function(err) {              // Connect to Database
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

// promptManagerAction will present menu options to the manager and trigger appropriate logic
function managerReconciliation() {
	// console.log('___ENTER promptManagerAction___');

	inquirer.prompt([            	// Management selection prompt
		{
			type: 'list',
			name: 'option',
			message: 'Please select an option:',
			choices: ['Itemized list of Products', 'Low Inventory Management', 'Inventory Replenishment', 'New Product Placement'],
			filter: function (val) {
				if (val === 'Itemized list of Products') {
					return 'list';
				} else if (val === 'Low Inventory Management') {
					return 'lowInventory';
				} else if (val === 'Inventory Replenishment') {
					return 'replenishInventory';
				} else if (val === 'New Product Placement') {
					return 'newProduct';
				} else {
					console.log('ERROR: Failed execution');     // Highly unlikely execution
					exit(1);
				}
			}
		}
	]).then(function(input) {

		if (input.option ==='list') {         		// Trigger the appropriate action based on the user input
			showUserInventory();
		} else if (input.option === 'lowInventory') {
			showLowInventory();
		} else if (input.option === 'replenishInventory') {
			replenishInventory();
		} else if (input.option === 'addNewInventory') {
			addNewInventory();
		} else {
			console.log('ERROR: Failed execution');             // Highly unlikely execution
			exit(1);
		}
	})
}

// showUserInventory retrieves the available inventory from the db and dkisplays on command line
function showUserInventory() {

	queryInputQuantity = 'SELECT * FROM products';              	// Construct the db query string

	connection.query(queryInputQuantity, function(err, data) {  	// Make the db query
		if (err) throw err;

		console.log('Welcome to Bamazon');
		console.log('Please check out our novelty items.');
		console.log('-----------------------------------\n');
		console.log('Item ID # |        Product Name          |      Department    | Price $ |  Stock  ');
		console.log('--------------------------------------------------------------------------------\n');

		var stringOutput = '';
		for (var i = 0; i < data.length; i++) {

			stringOutput = '';
			stringOutput += '   # ' + data[i].item_id + '    |   ';
			stringOutput += data[i].product_name + '  |  ';
			stringOutput += data[i].department_name + '  |  ';
			stringOutput += '$' + data[i].price + ' | ';
			stringOutput += data[i].stock_quantity + '\n';

			console.log(stringOutput);
		}

	  	console.log('--------------------------------------------------------------------------------\n');

		connection.end();         // Terminate DB connection
	})
}

function showLowInventory() {    // Itemize products with quantity below 20

	queryInputQuantity = 'SELECT * FROM products WHERE stock_quantity < 20';  	// Construct the DB query string

	connection.query(queryInputQuantity, function(err, data) {     	// Making DB query
		if (err) throw err;

        console.log('Low Stock (below 20): ');
        console.log('Please Replenish Listed Items.');
		console.log('-----------------------------------\n');
		console.log('Item ID # |        Product Name          |      Department    | Price $ |  Stock  ');
		console.log('--------------------------------------------------------------------------------\n');

		var stringOutput = '';
		for (var i = 0; i < data.length; i++) {

			stringOutput = '';
			stringOutput += '   # ' + data[i].item_id + '    |   ';
			stringOutput += data[i].product_name + '  |  ';
			stringOutput += data[i].department_name + '  |  ';
			stringOutput += '$' + data[i].price + ' | ';
			stringOutput += data[i].stock_quantity + '\n';

			console.log(stringOutput);
		}

	  	console.log('--------------------------------------------------------------------------------\n');

		connection.end();                          // Terminate DB connection
	})
}


function replenishInventory() { // replenishInventory suggests replenishing quantity to stock

	inquirer.prompt([       	// Prompt manager to select an option
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID to update stock.',
			validate: quantityCheck,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'Place recommended replenishment.',
			validate: quantityCheck,
			filter: Number
		}
	]).then(function(input) {

		var item = input.item_id;
		var replenishQuantity = input.quantity;

		var queryInputQuantity = 'SELECT * FROM products WHERE ?'; // Stock check to validate item quantity

		connection.query(queryInputQuantity, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log('ERROR: Invalid Item ID. Please select a valid Item ID.');
				replenishInventory();

			} else {
				var productData = data[0];

				console.log('Updating Inventory...');

				// Construct the updating query string
				var updatequeryInputQuantity = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity + replenishQuantity) + ' WHERE item_id = ' + item;

				// Update the inventory
				connection.query(updatequeryInputQuantity, function(err, data) {
					if (err) throw err;

					console.log('Stock count for Item ID ' + item + ' has been updated to ' + (productData.stock_quantity + replenishQuantity) + '.');
					console.log("\n---------------------------------------------------------------------\n");

					connection.end();       // Terminate DB connection
				})
			}
		})
	})
}


function addNewInventory() {                // New product placement

	inquirer.prompt([                   	// New product description
		{
			type: 'input',
			name: 'product_name',
			message: 'Please enter the new product name.',
		},
		{
			type: 'input',
			name: 'department_name',
			message: 'Categorize department location of new product.',
		},
		{
			type: 'input',
			name: 'price',
			message: 'What is the price per unit?',
			validate: validQuantityInput
		},
		{
			type: 'input',
			name: 'stock_quantity',
			message: 'How many units are in stock?',
			validate: quantityCheck
		}
	]).then(function(input) {

		console.log('New Product: ' + input.product_name + 'department_name = ' + input.department_name + 'price = $' + input.price + 'stock_quantity = ' + input.stock_quantity);

		var queryInputQuantity = 'INSERT INTO products SET ?';          // Inserting query string

		connection.query(queryInputQuantity, input, function (error, results, fields) { // Add new product to the rest DB
			if (error) throw error;

			console.log('New product successfully consolidated with existing inventory under new Item ID#: ' + results.insertId);
			console.log("\n-------------------------------------------------------------------------------------\n");

			connection.end();   // Terminate DB connection
		});
	})
}

function executeBamazon() {     // This runs main application logic
	managerReconciliation();    // Inventory management
}

executeBamazon();               // Run the app