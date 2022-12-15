//validation
var user = document.forms['form']['user'];
var password = document.forms['form']['password'];

var user_error =document.getElementById('email_er');
var pass_error =document.getElementById('pass_er');

user.addEventListener('textInput', user_Verify);
password.addEventListener('textInput', pass_Verify);

function validation(){
    if(user.value.length < 6){
        user.style.border = "1px solid red";
        user_error.style.display = "block";
        user.focus();
        return false;
    }
    if(password.value.length < 8){
        password.style.border = "1px solid red";
        pass_error.style.display = "block";
        password.focus();
        return false;
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

