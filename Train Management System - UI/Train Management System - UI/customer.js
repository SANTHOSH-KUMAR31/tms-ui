// Simulated train data
const trains = [
    { id: 'T001', name: 'Express Line 1' },
    { id: 'T002', name: 'Express Line 2' },
    { id: 'T003', name: 'Express Line 3' }
];

// Initialize customer data
const userData = JSON.parse(localStorage.getItem('userData'));
document.getElementById('customerName').innerText = userData.username;
document.getElementById('userID').value = 'U001'; // Simulated User ID
document.getElementById('name').value = userData.username;
document.getElementById('mobile').value = userData.mobile;

// Populate train options
const trainSelect = document.getElementById('trainSelection');
trains.forEach(train => {
    const option = document.createElement('option');
    option.value = train.id;
    option.text = `${train.name} (${train.id})`;
    trainSelect.add(option);
});

// Section display logic
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Logout function
function logout() {
    alert('You have been logged out.');
    window.location.href = 'login.html';
}

// Book Ticket Form Submission
document.getElementById('bookTicketForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const ticketData = {
        ticketID: 'TK' + Math.floor(Math.random() * 1000),
        trainID: document.getElementById('trainSelection').value,
        userID: document.getElementById('userID').value,
        userName: document.getElementById('name').value,
        boardingStation: document.getElementById('boardingStation').value,
        destinationStation: document.getElementById('destinationStation').value,
        boardingDateTime: document.getElementById('date').value,
        arrivalDateTime: 'N/A',
        numberOfTickets: document.getElementById('numberOfTickets').value
    };

    // Save ticket data (for demo purposes, using localStorage)
    let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    tickets.push(ticketData);
    localStorage.setItem('tickets', JSON.stringify(tickets));

    alert(`Booking confirmed! Your Ticket ID is ${ticketData.ticketID} and Train ID is ${ticketData.trainID}.`);
    showSection('viewTicketSection');
    loadTickets();
});

// Load Tickets
function loadTickets() {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    const userTickets = tickets.filter(ticket => ticket.userID === 'U001'); // Filter by User ID
    const tbody = document.querySelector('#ticketsTable tbody');
    tbody.innerHTML = '';

    userTickets.forEach(ticket => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ticket.ticketID}</td>
            <td>${ticket.trainID}</td>
            <td>${ticket.userID}</td>
            <td>${ticket.userName}</td>
            <td>${ticket.boardingStation}</td>
            <td>${ticket.destinationStation}</td>
            <td>${ticket.boardingDateTime}</td>
            <td>${ticket.arrivalDateTime}</td>
            <td>${ticket.numberOfTickets}</td>
            <td><button onclick="cancelTicket('${ticket.ticketID}')">Cancel Ticket</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Cancel Ticket
function cancelTicket(ticketID) {
    if (confirm('Are you sure you want to cancel this ticket?')) {
        let tickets = JSON.parse(localStorage.getItem('tickets')) || [];
        tickets = tickets.filter(ticket => ticket.ticketID !== ticketID);
        localStorage.setItem('tickets', JSON.stringify(tickets));
        alert('Ticket cancelled successfully.');
        loadTickets();
    }
}

// Update Details Form
document.getElementById('changePasswordCheckbox').addEventListener('change', function() {
    document.getElementById('passwordFields').style.display = this.checked ? 'block' : 'none';
});

document.getElementById('updateDetailsForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const updatedEmail = document.getElementById('updateEmail').value.trim();
    const updatedMobile = document.getElementById('updateMobile').value.trim();
    const updatedAddress = document.getElementById('updateAddress').value.trim();

    // Update email and mobile validations (reuse from registration)
    if (!updatedEmail.includes('@') || !updatedEmail.match(/\.[A-Za-z]{2,}$/)) {
        alert('Please enter a valid email address.');
        return;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(updatedMobile)) {
        alert('Mobile number must be 10 digits long and contain only numbers.');
        return;
    }

    userData.email = updatedEmail;
    userData.mobile = updatedMobile;
    userData.address = updatedAddress;

    // Update password if checkbox is checked
    if (document.getElementById('changePasswordCheckbox').checked) {
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;

        if (currentPassword !== userData.password) {
            alert('Current password is incorrect.');
            return;
        }

        // Password validation
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            alert('New password does not meet the requirements.');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            alert('New passwords do not match.');
            return;
        }

        userData.password = newPassword;
    }

    localStorage.setItem('userData', JSON.stringify(userData));
    alert('Details updated successfully.');
});

window.onload = function() {
    loadTickets();
};
