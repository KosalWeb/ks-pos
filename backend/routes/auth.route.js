const express = require("express")
const { signup, signin, signout, me } = require("../controllers/auth.controller")
const authGuard = require("../guards/auth.guard")
const restrict = require("../guards/restrict.guard")

const router = express.Router()

router.post("/signup",authGuard,restrict("admin"), signup)
router.post("/signin", signin)
router.get("/signout", authGuard,restrict("admin", "cashier"), signout)
router.get("/me", authGuard,restrict("admin", "cashier"), me)

module.exports = router