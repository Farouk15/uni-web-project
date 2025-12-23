
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





fetch('/uni-web-project/backend/login.php', {
    method: 'POST',
    body: new FormData(loginForm)
})
.then(response => response.json())
.then(data => {
    if (data.success) {
        localStorage.setItem('user_id', data.user_id);
        window.location.href = "/uni-web-project/index.html";
    } else {
        alert(data.message);
    }

    loginForm.reset();
})
.catch(err => {
    alert("Error: " + err.message);
});

});

