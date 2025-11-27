document.addEventListener('DOMContentLoaded', function() {
    // جلب الفورم
    const form = document.querySelector('.right form');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 

        // جلب القيم
        const firstName = form.querySelector('input[placeholder="First Name"]').value.trim();
        const lastName = form.querySelector('input[placeholder="Last Name"]').value.trim();
        const email = form.querySelector('input[placeholder="Email"]').value.trim();
        const message = form.querySelector('textarea[placeholder="Message"]').value.trim();

        
        if(firstName.length < 2) {
            alert('First Name must be at least 2 characters!');
            return;
        }

        if(lastName.length < 2) {
            alert('Last Name must be at least 2 characters!');
            return;
        }

        if(!email.includes('@')) {
            alert('Please enter a valid email!');
            return;
        }

        if(message.length < 10) {
            alert('Message must be at least 10 characters!');
            return;
        }

        
        alert('Message sent successfully!');
        form.reset(); 
    });
});