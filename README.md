# Bamazon
- MySQL Database
## Bizarre + Amazon = Bamazon

### Your digital destination for bizarre bazaar

### Overview
A Node.js &amp; MySQL digital storefront - a command line node app that mimics the mega online retailer.

### Node.js
Three JavaScript files replicate the basics of a simple ecommerce engine:
  - Running `node bamazonCustomer.js` will use MySQL to pull up all the products for sale.
  - Receives orders from customers via the command line and interfaces with mySQL to deplete stock from the store's inventory.
  
![Customer Page](/screenshots/customer.png)

  - Running `node bamazonManager.js` will display the basics of a warehouse management system.
  - It provides managers with a list of options to view stock and adjust inventory.
  - The menu can be seen below:
    
![Manager Page](/screenshots/manager.png)

### MySQL
The JavaScript files mentioned above query a MySQL database called `Bamazon` which is locally hosted.

- Please refer to the `Bamazon.sql` file to see how the database was created using raw SQL queries.

  - If you wish to run this app on your own machine, then please note the following commands:

    1. If you are new to MySQL, please set up [MySQL](http://dev.mysql.com/downloads/mysql/) and [MySQL Workbench](http://dev.mysql.com/downloads/workbench/) on your laptop and then open up to your localhost connection.
    2. Run `CREATE DATABASE Bamazon;` in mySQL Workbench.
    3. Be sure to select the correct database by running the `USE Bamazon;` 

### Technologies Used:
***

* Javascript
* nodeJS
* MySQL
* npm packages:
	- [mysql](https://github.com/felixge/node-mysql)
	- [prompt](https://github.com/flatiron/prompt)
	- [colors/safe](https://github.com/Marak/colors.js)    * Infusing fancy colors if time allowed.
	- [cli-table](https://github.com/Automattic/cli-table) * Adding more appealing table if time allowed.


