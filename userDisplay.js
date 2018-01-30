// ==========  Bamazon Node and MySQL App | Composed by John Kim | University of Richmond  ======================


// displayInventory will retrieve the current inventory from the database and output it to the console
function showUserInventory() {
	// console.log('___ENTER displayInventory___');

	// Construct the db query string
	queryInputQuantity = 'SELECT * FROM products';

	// Make the db query
	connection.query(queryInputQuantity, function(err, data) {
		if (err) throw err;

		console.log('Existing Inventory: ');
		console.log('...................\n');

		var stringOutput = '';
		for (var i = 0; i < data.length; i++) {
			stringOutput = '';
			stringOutput += 'Item ID: ' + data[i].item_id + '  //  ';
			stringOutput += 'Product Name: ' + data[i].product_name + '  //  ';
			stringOutput += 'Department: ' + data[i].department_name + '  //  ';
			stringOutput += 'Price: $' + data[i].price + '\n';

			console.log(stringOutput);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	//Prompt the user for item/quantity they would like to purchase
	  	confirmPurchase();
	})
}

// export to other Bamazon scripts
module.exports = userDisplay.js;