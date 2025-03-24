document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const loginUsername = document.getElementById('loginUsername').value.trim();
    const loginPassword = document.getElementById('loginPassword').value;

    // Fetch user data from localStorage
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (!storedUserData) {
        alert('No user registered with this username.');
        return;
    }

    if (loginUsername === storedUserData.username && loginPassword === storedUserData.password) {
        alert('Login successful!');
        window.location.href = 'customer_home.html';
    } else {
        alert('Invalid username or password.');
    }
});
