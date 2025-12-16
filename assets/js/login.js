
const loginForm = document.querySelector('.login-form');
const loginInputs = loginForm.querySelectorAll('.form__field');

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let email = loginInputs[0].value.trim();
    let password = loginInputs[1].value.trim();

    // Simple validation
    if (!email.includes('@')) {
        alert('Enter a valid email!');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters!');
        return;
    }





    fetch('../../backend/login.php', {
        method: 'POST',
        body: new FormData(loginForm)
    })
    .then(response => response.text()) // ← دي كانت المشكلة
    .then(data => {
        alert(data);   // Done أو Try again
        loginForm.reset();
    })
    .catch(err => {
        alert("Error");
    });
});

