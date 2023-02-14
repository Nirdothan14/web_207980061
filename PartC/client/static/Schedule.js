if (sessionStorage.getItem("CLASSES")) {
    classes = JSON.parse(sessionStorage.getItem("CLASSES"));
    drawTable(classes);
} else {
    fetch(`/api/classes`, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.data) {
                drawTable(response.data);
            } else {
                alert("לא נמצאו שיעורים להצגה");
            }
        })
        .catch((e) => {
            console.log(e);
            alert("התקבלה שגיאת שרת");
        });
}

function drawTable(classes) {
    document.querySelector(`tbody`).innerHTML = '';
    if (sessionStorage.getItem('LOGGED_IN_USER')) {
        const user = JSON.parse(sessionStorage.getItem('LOGGED_IN_USER'));
        try {
            fetch(`/api/getUserClasses/${user.id}`, {
                method: "GET"
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.error) {
                        alert(res.error);
                    }
                    else if (res.data?.length) {
                        for (let i=0; i<res.data.length; i++) {
                            const cls = res.data[i];
                            const date = new Date(cls.date);
                            const day = date.getDay();
                            const start_hour = date.getHours();
                            const registerButton = document.querySelector(`tbody > tr.hour-${start_hour}-${start_hour+1} > td:nth-of-type(${day+1}) > .task #cls-${cls.id}-${cls.tutor}`);

                            if (registerButton) {
                                registerButton.outerHTML = `<button class="cancel" onclick="cancel('${cls.id}-${cls.tutor}')">ביטול הרשמה</button>`;
                            }
                        }
                    }
                    else {
                        alert('זיהינו שטרם נרשמת לשיעורים, נשמח לראות אותך אצלנו בקרוב :)');
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
    
    const classesElem = document.querySelector("tbody");
    for (let i=0; i<14; i++) {
        classesElem.innerHTML+= `
        <tr class="hour-${i+8}-${i+9}">
            <th><div class="time">${i+8}:00 <br> - <br> ${i+9}:00</div></th>
            <td>
                <div class="task">
                </div>
            </td>
            <td>
                <div class="task">
                </div>
            </td>
            <td>
                <div class="task">
                </div>
            </td>
            <td>
                <div class="task">
                </div>
            </td>
            <td>
                <div class="task">
                </div>
            </td>
            <td>
                <div class="task">
                </div>
            </td>
            <td>
                <div class="task">
                </div>
            </td>
        </tr>
        `;
    }

    for (let i=0; i<classes?.length; i++) {
        const cls = classes[i];
        const date = new Date(cls.date);
        const day = date.getDay();
        const start_hour = date.getHours();

        const cell = document.querySelector(`tr.hour-${start_hour}-${start_hour+1} > td:nth-of-type(${day+1}) > .task`);
        
        if (cell && sessionStorage.getItem('LOGGED_IN_USER')) {
            cell.innerHTML += `
                <div class="cls">
                    <p class="cls-name">${cls.class_name}</p>
                    <span class="cls-tutor">${cls.tutor}</span>
                    <button id="cls-${cls.id}-${cls.tutor}" class="cls-btn" onclick="register('${cls.id}-${cls.tutor}')">הרשם</button>
                </div>
            `;
        }
        else if (cell) {
            cell.innerHTML += `
                <div class="cls">
                    <p class="cls-name">${cls.class_name}</p>
                    <span class="cls-tutor">${cls.tutor}</span>
                </div>
            `;
        }
    }
}

function register(class_id) {
    if (sessionStorage.getItem('LOGGED_IN_USER')) {
        const user = JSON.parse(sessionStorage.getItem('LOGGED_IN_USER'));
        try {
            fetch("/api/registerToClass", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    class_id,
                    user_id: user.id
                }),
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.error) {
                        alert(res.error);
                    }
                    else if (res.status === 'ok') {
                        alert('מעולה! רשמנו אותך לשיעור, לא לשכוח מגבת ומחצלת, נפגש בקרוב');
                        window.location.reload();
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
}

function cancel(class_id) {
    if (sessionStorage.getItem('LOGGED_IN_USER')) {
        const user = JSON.parse(sessionStorage.getItem('LOGGED_IN_USER'));
        try {
            fetch(`/api/cancelUserClass/${user.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    class_id
                }),
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.error) {
                        alert(res.error);
                    }
                    else if (res.status === 'ok') {
                        alert('אתה כבר לא רשום לשיעור זה');
                        window.location.reload();
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
}

const dateInput = document.getElementById('date');
const tutorInput = document.getElementById('tutor');
if (dateInput && tutorInput) {
    dateInput.addEventListener('change', function(){
        search();
    });
    tutorInput.addEventListener('change', function(){
        search();
    });
}

function search() {
    const cells = document.querySelectorAll(`tbody > tr > td > .task`);
    if (cells.length) {
        cells.forEach(cell => cell.style.backgroundColor = 'white');
    }

    const dateInput = document.getElementById('date');
    const tutorInput = document.getElementById('tutor');

    let api = `/api/classes/search`;
    if (dateInput.value && tutorInput.value) {
        api += `?date=${dateInput.value}&tutor=${tutorInput.value}`;
    }
    else if (dateInput.value && !tutorInput.value) {
        api += `?date=${dateInput.value}`;
    }
    else if (!dateInput.value && tutorInput.value) {
        api += `?tutor=${tutorInput.value}`;
    }

    fetch(api, {
        method: "GET",
    })
        .then((response) => response.json())
        .then((response) => {
            if (response.data) {
                for (let i=0; i<response.data.length; i++) {
                    const cls = response.data[i];
                    const date = new Date(cls.date);
                    const day = date.getDay();
                    const start_hour = date.getHours();
                    const cells = document.querySelectorAll(`tbody > tr.hour-${start_hour}-${start_hour+1} > td:nth-of-type(${day+1}) > .task`);

                    if (cells.length && (dateInput.value || tutorInput.value)) {
                        cells.forEach(cell => cell.style.backgroundColor = 'yellow');
                        document.querySelector(`tbody`).scrollIntoView({behavior: "smooth"});
                    }
                }

            } else {
                alert("לא נמצאו שיעורים להצגה עבור החיפוש המבוקש");
            }
        })
        .catch((e) => {
            console.log(e);
            alert("התקבלה שגיאת שרת");
        });
}