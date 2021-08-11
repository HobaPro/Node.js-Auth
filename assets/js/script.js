var signUpLink = document.getElementById('signup');

function windowLocation () {
    if (window.location.pathname === "/signup"){
        signUpLink.style.display = "none"
    }
}

windowLocation()