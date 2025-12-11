// Get the reservation form
const form = document.querySelector('#reservationForm');

// Handle form submission
form.addEventListener('submit', function(event) {
	event.preventDefault();

	// Get input values
	const fullName = document.querySelector('#fullNameInput').value;
	const phoneNumber = document.querySelector('#phoneInput').value;
	const partySize = document.querySelector('#partySizeSelect').value;
	const email = document.querySelector('#emailInput').value;

	// Check if required fields are filled
	if (!fullName || !phoneNumber || !partySize || !email) {
		alert('Please fill all required fields');
		return;
	}

	// Show success message and reset form
	alert('Reservation save!');
	form.reset();
});