//validation
var user = document.forms['form']['user'];
var password = document.forms['form']['password'];

var user_error =document.getElementById('email_er');
var pass_error =document.getElementById('pass_er');

user.addEventListener('textInput', user_Verify);
password.addEventListener('textInput', pass_Verify);

function login(event){
    event.preventDefault();

    if(!user.value){
        user.style.border = "1px solid red";
        user_error.style.display = "block";
        user.focus();
        return false;
    }
    else if(!password.value){
        password.style.border = "1px solid red";
        pass_error.style.display = "block";
        password.focus();
        return false;
    }

    try {
        fetch("/api/signIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: user.value,
                password: password.value
            }),
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.error) {
                    alert(res.error);
                }
                else if (res.response) {
                    sessionStorage.setItem('LOGGED_IN_USER', JSON.stringify(res.response));
                    window.location = 'index.html';
                }
            })
            .catch((ex) => {
                console.log(ex);
                alert(ex);
            });
    }
    catch(e) {
        console.log(e);
        alert(e.message);
    }
}

function user_Verify(){
    if (user.value.length >= 6){
        user.style.border = "1px solid silver";
        user_error.style.display = "none";
        return true;
    }
}
function pass_Verify(){
    if (password.value.length >= 8){
        password.style.border = "1px solid silver";
        pass_error.style.display = "none";
        return true;
    }
}
// greeting the web users with the matching day color
function myGreet(){
    var h = new Date().getHours();
    if(h < 12){
        document.getElementById("greet").style.color = "yellow";
        document.getElementById("greet").innerHTML = "בוקר טוב למתרגלים שלי";
    }else if (h < 18){
        document.getElementById("greet").style.color = "white";
        document.getElementById("greet").innerHTML = "צהריים נעימים לכולם";
    }else {
        document.getElementById("greet").style.color = "black";
        document.getElementById("greet").innerHTML = "ערב טוב מלא בשלווה ונחת";
    }
}

