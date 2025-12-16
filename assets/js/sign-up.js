
const signupForm = document.querySelector('.login-form');
const inputs = signupForm.querySelectorAll('.form__field');

signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let email = inputs[0].value.trim();
    let name = inputs[1].value.trim();
    let number = inputs[2].value.trim();
    let password = inputs[3].value.trim();
    let confirmPassword = inputs[4].value.trim();

    
    if (!email.includes('@')) {
        alert('Enter a valid email!');
        return;
    }

    if (name.length < 2) {
        alert('Name must be at least 2 characters!');
        return;
    }

    if (!/^\d+$/.test(number)) {
        alert('Number must contain digits only!');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters!');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }


    fetch('../backend/create.php', {
        method: 'POST',
        body: new FormData(signupForm)
    })
    .then(data => {
        alert(data); 
        signupForm.reset(); 
    })

});

