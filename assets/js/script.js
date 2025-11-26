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

    // Function to set active class on current page navigation
    function setActiveNav() {
        const currentPath = window.location.pathname.split('/').pop(); // Get the current page filename
        const navLinks = document.querySelectorAll('.ul-cls a, .sidebar-menu a'); // Select all nav links

        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href').split('/').pop(); // Get the link's filename
            if (linkHref === currentPath) {
                link.parentElement.classList.add('active'); // Add active class to the li
            } else {
                link.parentElement.classList.remove('active'); // Remove active class from others
            }
        });
    }

    // Call the function to set active nav on page load
    setActiveNav();
});

let mybutton = document.getElementById("back_to_top");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
 const btn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            btn.classList.add("show");
        } else {
            btn.classList.remove("show");
        }
    });

    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
});


// $(document).ready(function() {
// 			$('.minus').click(function () {
// 				var $input = $(this).parent().find('input');
// 				var count = parseInt($input.val()) - 1;
// 				count = count < 1 ? 1 : count;
// 				$input.val(count);
// 				$input.change();
// 				return false;
// 			});
// 			$('.plus').click(function () {
// 				var $input = $(this).parent().find('input');
// 				$input.val(parseInt($input.val()) + 1);
// 				$input.change();
// 				return false;
// 			});
// });
