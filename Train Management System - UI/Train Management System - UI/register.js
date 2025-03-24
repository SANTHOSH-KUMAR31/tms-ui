document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const aadhar = document.getElementById('aadhar').value.trim();

    // Username validation
    const usernameRegex = /^[A-Za-z]{6,}$/;
    if (!usernameRegex.test(username)) {
        alert('Username must be at least 6 characters long and contain only letters.');
        return;
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        alert('Password must be at least 8 characters long, include at least one uppercase letter, one number, and one special character.');
        return;
    }

    // Confirm Password validation
    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    // Email validation
    if (!email.includes('@') || !email.match(/\.[A-Za-z]{2,}$/)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Mobile Number validation
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobile)) {
        alert('Mobile number must be 10 digits long and contain only numbers.');
        return;
    }

    // Aadhar Number validation
    if (aadhar === '') {
        alert('Aadhar number cannot be empty.');
        return;
    }

    // Store user data (for demo purposes, using localStorage)
    const userData = {
        username,
        password,
        email,
        mobile,
        aadhar
    };
    localStorage.setItem('userData', JSON.stringify(userData));

    alert('Registration successful!');
    window.location.href = 'login.html';
});
