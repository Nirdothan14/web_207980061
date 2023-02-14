const express = require("express");
const controller = require("../controller");
const router = express.Router();

router
    .route("/api/signIn")
    .post(controller.signIn);

router
    .route("/api/signUp")
    .post(controller.signUp);

router
    .route("/api/classes")
    .get(controller.getClasses);

router
    .route("/api/classes/search")
    .get(controller.searchClasses);

router
    .route("/api/getUserClasses/:id")
    .get(controller.getUserClasses);

router
    .route("/api/cancelUserClass/:id")
    .delete(controller.cancelUserClass);

router
    .route("/api/registerToClass")
    .put(controller.registerToClass);


module.exports = router;