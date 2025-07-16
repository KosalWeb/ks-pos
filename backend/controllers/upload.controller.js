const multer = require("multer")
const fs = require("fs")
const path = require("path")

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderPath = path.join(__dirname, "../upload")
        fs.mkdirSync(folderPath, {recursive: true})
        cb(null, folderPath)
    },

    filename: (req, file, cb) => {
        const extName = path.extname(file.originalname)
        const filename = Date.now() + extName
        cb(null, filename)
    }
})

const fileFilter  = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"]
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb( new Error("Only JPEG, PNG, JPG and GIF are allowed"), false)
    }
}

const upload = multer({
    storage: diskStorage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})


exports.uploadFile = (req, res) => {
    try {   
        upload.single("imageUrl")(req, res, (err) => {
                if(err){
                    return res.status(400).json({
                        success:false,
                        error: err.message
                    })
                }

                if(!req.file){
                    return res.status(400).json({
                        success:false,
                        error: "No file provided!"
                    })
                }

                return res.status(200).json({
                    success:true,
                    message: "Image upload successfully!",
                    filename: req.file.filename
                })
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            error: "Upload failed"
        })
    }
}

exports.removeFile = (req, res) => {
    try {
        const imagePath = path.join(__dirname, "../upload", req.params.imageUrl)

        if(fs.existsSync(imagePath)){
            fs.unlinkSync(imagePath)
            res.status(200).json({
                success: true,
                message: "Image delete successfully!"
            })
        }else{
            res.status(404).json({
                success: false,
                error: "Image not found!"
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            error: "Error while deleting image!"
        })
    }
}


