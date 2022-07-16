const express = require("express")
const router = express.Router();

const {
    sendMail,
    render
} = require("../controllers/mail")


router.route("/").post(sendMail).get(render)

module.exports = router