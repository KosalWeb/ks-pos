const express = require("express")
const { uploadFile, removeFile } = require("../controllers/upload.controller")
const restrict = require("../guards/restrict.guard")

const router = express.Router()

router.post("/",restrict("admin"), uploadFile)
router.delete("/:imageUrl",restrict("admin"), removeFile)

module.exports = router