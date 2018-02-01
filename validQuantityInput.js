// Checks manager inputs valid quantity 

function validQuantityInput(value) {               

	var number = (typeof parseFloat(value)) === 'number';
	var goodNumber = parseFloat(value) > 0;

	if (number && goodNumber) {
		return true;
	} else {
		return 'Please enter a valid number for the unit price.'
	}
}

module.exports = validQuantityInput;