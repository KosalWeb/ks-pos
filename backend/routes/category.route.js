const express = require("express")
const { create, findAll, findOne, remove, update } = require("../controllers/category.controller")
const restrict = require("../guards/restrict.guard")

const router = express.Router()

router
    .route("/")
    .post(restrict("admin"),create)
    .get(restrict("admin","cashier"),findAll)

router
    .route("/:id")
    .get(restrict("admin","cashier"),findOne)
    .patch(restrict("admin"),update)
    .delete(restrict("admin"),remove)

module.exports = router
