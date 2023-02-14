const { conn } = require("../db/db");

exports.signUp = (req, res) => {
    if (!req.body) {
        res.status(404).json({ error: "No form data found" });
    } else {
        conn.query(
            `INSERT INTO web.users(fullname, username, email, password, gender) VALUES ('${req.body.fullname}', '${req.body.username}', '${req.body.email}' ,'${req.body.password}', '${req.body.gender}')`,
            function (err, mysqlres) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(201).json({ response: "user created!" });
                }
            }
        );
    }
};

exports.signIn = (req, res) => {
    const { username, password } = req.body;
    conn.query("SELECT * FROM web.users WHERE `username` = '" + username + "' AND `password` = '" + password + "' LIMIT 1",
    function (err, data, fields) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else if (!data?.length) {
            res.status(400).json({ error: 'no user was found' });
        }else {
            res.status(200).json({
                response: JSON.parse(JSON.stringify(data[0])),
            });
        }
    });
};

exports.getClasses = (req, res, next) => {
    conn.query(
        "SELECT * FROM web.classes",
        function (err, data, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ data });
            }
        }
    );
};

exports.getUserClasses = (req, res) => {
    const { id } = req.params;

    conn.query(
        `SELECT c.* FROM web.user_classes as uc JOIN classes c ON c.id = uc.class_id WHERE uc.user_id = ${id}`,
        function (err, data, fields) {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.status(200).json({ data });
            }
        }
    );
};

exports.cancelUserClass = (req, res) => {
    const { id } = req.params;
    const { class_id } = req.body;

    if (!req.params || !req.body) {
        res.status(404).json({ error: "No form data found" });
    }
    else {
        conn.query(
            `DELETE FROM web.user_classes WHERE user_id = ${id} AND class_id = '${class_id}'`,
            function (err, data, fields) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(201).json({ status: 'ok' });
                }
            }
        );
    }
};

exports.registerToClass = (req, res) => {
    if (!req.body) {
        res.status(404).json({ error: "No form data found" });
    } else {
        conn.query(
            `INSERT INTO web.user_classes(class_id, user_id) VALUES ('${req.body.class_id}', '${req.body.user_id}')`,
            function (err, mysqlres) {
                if (err) {
                    res.status(500).json({ error: err.message });
                } else {
                    res.status(201).json({ status: 'ok' });
                }
            }
        );
    }
};

exports.searchClasses = (req, res) => {
    const date = req.query["date"];
    const tutor = req.query["tutor"];

    let sql = `SELECT * FROM web.classes`;
    if (date && tutor) {
        sql += ` WHERE date LIKE '%${date}%' AND tutor = '${tutor}'`;
    }
    else if (date && !tutor) {
        sql += ` WHERE date LIKE '%${date}%'`;
    }
    else if (!date && tutor) {
        sql += ` WHERE tutor = '${tutor}'`;
    }

    conn.query(sql, function (err, data, fields) {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(200).json({ data });
        }
    });
};