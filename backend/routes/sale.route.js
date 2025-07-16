const express = require("express")
const restrict = require("../guards/restrict.guard")
const { create, findAll, findOne, checkStock, addPayment } = require("../controllers/sale.controller")

const router = express.Router()

router
    .route("/")
    .post(restrict("admin", "cashier"),create)
    .get(restrict("admin", "cashier"), findAll)

router 
    .route("/find/:id")
    .get(restrict("admin", "cashier"), findOne)

router.get("/checkStock", restrict("admin", "cashier"), checkStock)
router.patch("/addPayment/:id",restrict("admin", "cashier"), addPayment)

module.exports = router
