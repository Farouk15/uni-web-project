document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');
    const closeBtn = document.getElementById('close-btn');

    // Toggle sidebar on hamburger click
    hamburger.addEventListener('click', function() {
        sidebar.classList.toggle('open');
        // Hide close button when sidebar is open
        if (sidebar.classList.contains('open')) {
            closeBtn.style.display = 'none';
        } else {
            closeBtn.style.display = 'block';
        }
    });

    // Close sidebar on close button click
    closeBtn.addEventListener('click', function() {
        sidebar.classList.remove('open');
        closeBtn.style.display = 'block';
    });

    // Close sidebar when clicking outside of it
    document.addEventListener('click', function(event) {
        if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
            sidebar.classList.remove('open');
            closeBtn.style.display = 'block';
        }
    });
});
