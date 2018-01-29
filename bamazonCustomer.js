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

