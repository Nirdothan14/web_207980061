const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const route = require("./route");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(route);

app.use(express.static(__dirname + "/client/views/index.html"));
app.use("/index.html", express.static(__dirname + "/client/views/index.html"));
app.use("/About.html", express.static(__dirname + "/client/views/About.html"));
app.use("/Contact.html", express.static(__dirname + "/client/views/Contact.html"));
app.use("/Log.html", express.static(__dirname + "/client/views/Log.html"));
app.use("/Reflexlogy.html", express.static(__dirname + "/client/views/Reflexlogy.html"));
app.use("/Registration.html", express.static(__dirname + "/client/views/Registration.html"));
app.use("/Schedule.html", express.static(__dirname + "/client/views/Schedule.html"));
app.use("/Yoga.html", express.static(__dirname + "/client/views/Yoga.html"));
app.use("/static", express.static(__dirname + "/client/static"));
app.use("/img", express.static(__dirname + "/client/static/img"));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
const db = require('./db/db');
db.init();