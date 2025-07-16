const dotenv = require('dotenv')
dotenv.config()
const express = require("express")
const errorHandler = require("./helpers/error-handler")
const qs = require("qs")
const cookieParser = require("cookie-parser")


const categoryRouter = require("./routes/category.route")
const customerRouter = require("./routes/customer.route")
const supplierRouter = require("./routes/supplier.route")
const uploadRouter = require("./routes/upload.route")
const productRouter = require("./routes/product.route")
const authRouter = require("./routes/auth.route")
const userRouter = require("./routes/user.route")
const purchaseRouter = require("./routes/purchase.route")
const saleRouter = require("./routes/sale.route")
const reportRouter = require("./routes/report.route")
const authGuard = require("./guards/auth.guard")
const morgan = require("morgan")
const { default: helmet } = require("helmet")
const { default: rateLimit } = require("express-rate-limit")
const cors = require('cors')

const app = express()


const allowedOrigins = [
    process.env.LOCAL_DOMAIN,
    process.env.CLIENT_DOMAIN
]

app.use(cors({
    origin: (origin, callback) => {
        console.log('origin:',origin)
        if(!origin || allowedOrigins.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['Set-Cookie', 'Authorization']
}))


app.set('query parser', (queryString) => {
    return qs.parse(queryString, {
        decoder: (value) => {
            const num = Number(value);
            return isNaN(num) ? value : num;
        }
    })
})

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 1000,
    message: {
        success: false,
        error: 'Too many requests from this IP, please try again!'
    }
})
app.use(limiter)
app.use(helmet({crossOriginResourcePolicy: false}))
app.use(morgan( process.env.NODE_ENV === "production" ? 'combined' : 'dev'))
app.use(express.json())
app.use(cookieParser())
app.use("/api/v1/categories",authGuard,categoryRouter)
app.use("/api/v1/customers",authGuard, customerRouter)
app.use("/api/v1/suppliers",authGuard, supplierRouter)
app.use("/api/v1/upload",authGuard, uploadRouter)
app.use("/api/v1/products",authGuard, productRouter)
app.use("/api/v1/purchase",authGuard, purchaseRouter)
app.use("/api/v1/users",authGuard, userRouter)
app.use("/api/v1/sale", authGuard, saleRouter)
app.use("/api/v1/report", authGuard, reportRouter)
app.use("/api/v1/auth", authRouter )
app.use("/upload", express.static('upload'))
app.use(errorHandler)

module.exports = app