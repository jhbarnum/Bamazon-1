# Bamazon
MySQL Database
## Bizarre + Amazon = Bamazon

### Your digital destination for bizarre bazaar

### Overview
A Node.js &amp; MySQL digital storefront - a command line node app that mimics a beloved online retailer.


### Node.js
Three JavaScript files replicate the basics of a simple ecommerce engine:

- `BamazonCustomer.js` _([See example here](#customer))_
  - Receives orders from customers via the command line and interfaces with mySQL to deplete stock from the store's inventory.

- `BamazonManager.js` _([See example here](#manager))_
  - Mimics the basics of a warehouse management system, providing managers with a list of options to view stock and adjust inventory.
  - A sample of the menu is below:
    * View Products for Sale 
    * View Low Inventory
    * Add to Inventory
    * Add New Product

### MySQL
The JavaScript files mentioned above query a MySQL database called `Bamazon` which is locally hosted on my laptop.

- Please refer to the `Bamazon.sql` file to see how the database was created using raw SQL queries.

  - If you wish to run this app on your own machine, then please note the following commands:

    1. If you are new to MySQL, please set up [MySQL](http://dev.mysql.com/downloads/mysql/) and [MySQL Workbench](http://dev.mysql.com/downloads/workbench/) on your laptop and then open up to your localhost connection.
    2. Run `CREATE DATABASE Bamazon;` in mySQL Workbench.
    3. Be sure to select the correct database by running the `USE Bamazon;` 



### Screenshots
Below are some screenshots that show the functionality of the app.


<a name="customer"></a>
- Below is a demo of the `BamazonCustomer.js` file...
  - Running `node BamazonCustomer.js` will use MySQL to pull up all the products for sale.



### Technologies Used:
***

* Javascript
* nodeJS
* MySQL
* npm packages:
	- [mysql](https://github.com/felixge/node-mysql)
	- [prompt](https://github.com/flatiron/prompt)
	- [colors/safe](https://github.com/Marak/colors.js)
	- [cli-table](https://github.com/Automattic/cli-table)


