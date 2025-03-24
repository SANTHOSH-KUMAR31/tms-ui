// Initialize admin data
let adminData = {
    username: 'admin',
    password: 'Admin@123',
    mobile: '9999999999',
    email: 'admin@example.com'
};

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

// Load Customer Data
function loadCustomerData() {
    const users = [JSON.parse(localStorage.getItem('userData'))];
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    const tbody = document.querySelector('#customerTable tbody');
    tbody.innerHTML = '';

    users.forEach((user, index) => {
        const userTickets = tickets.filter(ticket => ticket.userID === 'U001'); // Simulated User ID
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>U00${index + 1}</td>
            <td>${user.username}</td>
            <td>${user.mobile}</td>
            <td>${userTickets.length}</td>
            <td><button onclick="deleteCustomer(${index})">Delete Customer</button></td>
        `;
        tbody.appendChild(row);
    });
}

// Delete Customer
function deleteCustomer(index) {
    if (confirm('Are you sure you want to delete this customer?')) {
        // For demo purposes, we are not actually deleting the user
        alert('Customer deleted successfully.');
        loadCustomerData();
    }
}

// Register Train Form Submission
document.getElementById('registerTrainForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const trainData = {
        trainName: document.getElementById('trainName').value,
        numberOfSeats: document.getElementById('numberOfSeats').value,
        to: document.getElementById('trainTo').value,
        from: document.getElementById('trainFrom').value,
        ownership: document.getElementById('ownership').value
    };

    // Save train data (for demo purposes, using localStorage)
    let trains = JSON.parse(localStorage.getItem('trains')) || [];
    trains.push(trainData);
    localStorage.setItem('trains', JSON.stringify(trains));

    alert('Train registered successfully.');
});

// Update Admin Profile
document.getElementById('adminProfileForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const updatedUsername = document.getElementById('adminUsername').value.trim();
    const updatedPassword = document.getElementById('adminPassword').value;
    const updatedMobile = document.getElementById('adminMobile').value.trim();
    const updatedEmail = document.getElementById('adminEmail').value.trim();

    // Update validations
    if (!updatedEmail.includes('@') || !updatedEmail.match(/\.[A-Za-z]{2,}$/)) {
        alert('Please enter a valid email address.');
        return;
    }

    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(updatedMobile)) {
        alert('Mobile number must be 10 digits long and contain only numbers.');
        return;
    }

    adminData.username = updatedUsername;
    adminData.password = updatedPassword;
    adminData.mobile = updatedMobile;
    adminData.email = updatedEmail;

    alert('Profile updated successfully.');
});

// Initial Load
window.onload = function() {
    loadCustomerData();
};
