//register page validation
function register(event) {
    event.preventDefault();

    let fName = document.getElementById("fullname").value;
    let mail = document.getElementById("email").value;
    let user = document.getElementById("username").value;
    let pass = document.getElementById("Password").value;
    let gender = document.querySelector("input[name='Gender']:checked")?.getAttribute('id');
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
    if (!gender) {
        message.innerHTML = "חייב לבחור מין";
        return false;
    }

    //hideError
    message.innerHTML = "";

    try {
        fetch("api/signUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullname: fName,
                email: mail,
                username: user,
                password: pass,
                gender,
            }),
        })
            .then((res) => {
                if (res.error) {
                    alert(res.error);
                }else {
                    alert("נרשמת למערכת בהצלחה :)")
                    window.location = 'Log.html';
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
