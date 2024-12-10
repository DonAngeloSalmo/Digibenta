function loginWithDiscord() {
    fetch('controller/login_discord')
        .then(response => response.json())
        .then(data => {
            if (data.authorize_url) {
                window.location.href = data.authorize_url;
            } else {
                toastr.error('Failed to fetch authorization URL.', 'Error');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            toastr.error('An error occurred. Please try again.', 'Error');
        });
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

function toggleNav() {
    var navMenu = document.getElementById('nav-menu');
    var navToggle = document.getElementById('nav-toggle-label');
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('open');
}

function submitForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var url = 'controller/auth';

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            toastr.success(data.message, 'Success');
            setTimeout(function() {
                window.location.href = data.redirect;
            }, 2000);
        } else {
            toastr.error(data.message, 'Error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        toastr.error('An error occurred. Please try again.', 'Error');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    toastr.options = {
        "closeButton": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
});
