
// validateInput makes sure that the user is supplying only positive integers for their inputs
function validEntry(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a valid number.';
	}
}

module.exports = validEntry;