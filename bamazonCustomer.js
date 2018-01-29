// ==========  Bamazon Node and MySQL App | Composed by John Kim | Univeristy of Richmond  ======================

//      Required Dependencies
var inquirer = require('inquirer');        // Inquirer node package
var prompt = require('prompt');            // Prompt node package 
var mysql = require('mysql');              // MySQL node package

var connection = mysql.createConnection({  // MySQL Database parameters
    host: "localhost",
    port: 3306,
    user: "root",                          // Username
    password: "neverCanRemember",          // Password
    database: "Bamazon"
});

connection.connect(function(err) {         // Connect to Database
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

function promptBuyer() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'item_id',
      message: 'To purchase, input the Item ID',
      validate: validateInput,
      filter: Number
    },
    {
      type: 'input',
      name: 'quantity',
      message: 'Quantity?',
      validate: validateInput,
      filter: Number
    }
  ]).then(function(input) {
    var item = input.quantity;
    var quantity = input.quantity;
    var queryInputQuantity = 'SELECT * FROM products WHERE ?';

    connection.query(queryInputQuantity, {item_id: item}, function(err, data) {
      if (err) throw err;                           // If bad item id, console log invalid entry
      if (data.length === 0) { 
        console.log('Error: Invalid Item ID. Please retry.');
        displayInventory();
      } else {
        var bamazonQuantity = res[0].StockQuantity; // Quantity available

        if (bamazonQuantity >= buyItemQuantity) {

        // reduction in inventory
        var updatedInventory = parseInt(bamazonQuantity) - parseInt(buyItemQuantity); // integer deduction from DBase  
        connection.query(updatedInventory, function(err, data) {
          if (err) throw err;

          console.log('Your order is submitted. Your total is: $' + lasjdfasjdf * quantity);
          console.log('Thank you for your order');
          connection.end();
        })
      } else {
        console.log('Item is out of stock');
        displayInventory();
        }

        }
      }
    })
  })
}
