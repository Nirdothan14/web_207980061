//register page validation
function RegValidation() {
    let fName = document.getElementById("fullname").value;
    let mail = document.getElementById("email").value;
    let user = document.getElementById("username").value;
    let pass = document.getElementById("Password").value;
    let message = document.getElementById("message");

    if (fName.length < 5) {
        message.innerHTML = "שם מלא הינו קצר מידי / אינו תקין";
        return false;
    }
    if (fName.length > 20) {
        message.innerHTML = "שם מלא הינו ארוך מידי";
        return false;
    }
    if (!mail.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        message.innerHTML = "כתובת מייל לא תקינה"
        return false;
    }
    if (mail == "") {
        document.getElementById("message").innerHTML = "הכנס מייל בבקשה!";
        return false;
    }
    if (user.length < 6) {
        message.innerHTML = "שם משתמש חייב להיות באורך של לפחות 6 תווים ";
        return false;
    }
    if (pass.length < 8) {
        message.innerHTML = "סיסמא חייבת להכיל לפחות 8 תווים";
        return false;
    }
    if (!pass.match(/(?=.*\d)/g)) {
        message.innerHTML = "סיסמא חייבת להכיל לפחות ספרה אחת";
        return false;
    }
    if (!pass.match(/^[a-zA-Z0-9]*$/)) {
        message.innerHTML = "Password can only contain digits and English letters";
        return false;
    }
    //hideError
    message.innerHTML = "";
    alert("נרשמת למערכת בהצלחה :)")
    console.log("success");
    return true;
}
