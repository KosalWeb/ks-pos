const express = require("express")
const restrict = require("../guards/restrict.guard")
const { create, findAll, findOne, updatePurchaseStatus, addPayment } = require("../controllers/purchase.controller")

const router = express.Router()

router
    .route("/")
    .post(restrict("admin"),create)
    .get(restrict("admin"),findAll)

router
    .route("/:id")
    .get(restrict("admin"),findOne)

router.patch("/updatePurchaseStatus/:id",restrict("admin"), updatePurchaseStatus)
router.patch("/addPayment/:id",restrict("admin"), addPayment)


 

module.exports = router
