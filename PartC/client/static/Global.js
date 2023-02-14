const loginPage = document.getElementById('login-page');
if (loginPage) {
    if (sessionStorage.getItem('LOGGED_IN_USER')) {
        const user = JSON.parse(sessionStorage.getItem('LOGGED_IN_USER'));
        loginPage.innerHTML = `<span>היי ${user.fullname}, <strong>התנתק</strong></span>`;
        loginPage.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.clear();
            window.location = "Log.html";
        })
    }
}