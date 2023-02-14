const config = require("./db.config");
const mysql = require("mysql");
const moment = require("moment");

const conn = mysql.createConnection(config);
conn.connect();

init = () => {
    conn.query(
        `CREATE DATABASE IF NOT EXISTS web;`,
        function (err, data, fields) {
            if (err) {
                throw new Error(err.message);
            } else {
                console.log({
                    msg: "database web created!",
                });
            }
        }
    );

    conn.query(
        `CREATE TABLE IF NOT EXISTS web.users (
            id INT NOT NULL AUTO_INCREMENT,
            username VARCHAR(50) NOT NULL ,
            fullname VARCHAR(50) NOT NULL ,
            email VARCHAR(50) NOT NULL ,
            gender VARCHAR(6) NOT NULL ,
            password VARCHAR(25) NOT NULL ,
            PRIMARY KEY (id)
        );`,
        function (err, data, fields) {
            if (err) {
                throw new Error(err.message);
            } else {
                console.log({
                    msg: "users table created!",
                });
            }
        }
    );

    conn.query(
        `CREATE TABLE IF NOT EXISTS web.classes (
            id INT NOT NULL AUTO_INCREMENT,
            class_name VARCHAR(50) NOT NULL ,
            tutor VARCHAR(50) NOT NULL ,
            date datetime NOT NULL ,
            PRIMARY KEY (id)
        );`,
        function (err, data, fields) {
            if (err) {
                throw new Error(err.message);
            } else {
                console.log({
                    msg: "classes table created!",
                });
            }
        }
    );

    conn.query(
        `CREATE TABLE IF NOT EXISTS web.user_classes (
            id INT NOT NULL AUTO_INCREMENT,
            class_id VARCHAR(50) NOT NULL ,
            user_id INT NOT NULL ,
            PRIMARY KEY (id)
        );`,
        function (err, data, fields) {
            if (err) {
                throw new Error(err.message);
            } else {
                console.log({
                    msg: "user_classes table created!",
                });
            }
        }
    );

    conn.query(
        `SELECT COUNT(*) as count FROM web.users`,
        function (err, data, fields) {
            if (err) {
                throw new Error(err.message);
            } else {
                const genders = ['male', 'female', 'other'];
                results = JSON.parse(JSON.stringify(data));
                if (results[0].count === 0) {
                    for (let i = 1; i <= 3; i++) {
                        var randomGender = genders[Math.floor(Math.random()*genders.length)];
                        conn.query(
                            `INSERT INTO web.users (id, password, fullname, username, email, gender)
                        VALUES (${i}, '123456', 'משתמש ${i}', 'user${i}', 'user${i}@gmail.com', '${randomGender}')`,
                            function (err, data, fields) {
                                if (err) {
                                    throw new Error(err.message);
                                } else {
                                    console.log({
                                        msg: `user${i} created!`,
                                    });
                                }
                            }
                        );
                    }
                }
            }
        }
    );

    const tutors = ['יאנה', 'אלנה', 'דנה','ריטה'];
    const class_names = ['יוגה לילדים', 'האטה יוגה', 'רפלקסולוגיה'];

    conn.query(
        `SELECT COUNT(*) as count FROM web.classes`,
        function (err, data, fields) {
            if (err) {
                throw new Error(err.message);
            } else {
                results = JSON.parse(JSON.stringify(data));
                if (results[0].count === 0) {
                    let dt;
                    for (let i = 0; i <= 6; i++) {
                        dt = moment(new Date()).startOf('week').add(i, 'days');
                        for (let j = 8; j <= 22; j++) {
                            dt = moment(dt.toDate().setHours(j));

                            const cls = {
                                id: i + 1,
                                class_name: class_names[Math.floor(Math.random()*class_names.length)],
                                tutor: tutors[Math.floor(Math.random()*tutors.length)],
                                date: dt.format('YYYY-MM-DD HH:mm:ss')
                            };
    
                            conn.query(
                                `INSERT INTO web.classes (class_name, tutor, date)
                                VALUES ('${cls.class_name}', '${cls.tutor}', '${cls.date}')`,
                                function (err, data, fields) {
                                    if (err) {
                                        throw new Error(err.message);
                                    } else {
                                        console.log({
                                            msg: `class ${i}${j} created!`,
                                        });
                                    }
                                }
                            );
                        }
                    }
                }
            }
        }
    );
};

module.exports = { conn, init };
