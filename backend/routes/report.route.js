const express = require("express")
const { generalReport, saleReport, stockReport, salereportIn30Days } = require("../controllers/report.controller")
const restrict = require("../guards/restrict.guard")

const router = express.Router()

router.get("/general",restrict("admin"), generalReport)
router.get("/sale", restrict("admin"), saleReport )
router.get("/stock", restrict("admin"), stockReport)
router.get("/30daysAgo", restrict("admin"), salereportIn30Days)

module.exports = router