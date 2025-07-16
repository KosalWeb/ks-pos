const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
exports.signup = async (req, res, next) => {
    try {
        
        if(!req.body.password){
            return res.status(400).json({
                success: false,
                error: "Password is required"
            })
        }

        if(req.user.role  !== "super" && req.body.role == "admin"){
            return res.status(403).json({
                success: false,
                error: "Only super users can create admin account!"
            })
        }

        const hashed = await bcryptjs.hash(req.body.password, 10)
        const newUser = await User.create({
            ...req.body,
            password: hashed
        })

        delete newUser.password

        res.status(201).json({
            success: true,
            result: newUser
        })
    } catch (error) {
        next(error)
    }
}

exports.signin = async (req, res, next) => {
    try {
        const {email, password} = req.body
        //1. validate email and password
        if(!email || !password){
            return res.status(400).json({
                success: false,
                error: "email and password are required"
            })
        }

       

        //2. find email if exist
        const user = await User.findOne({email}).select("+password")
        if(!user){
            return res.status(401).json({
                success: false,
                error: "Unauthorization"
            })
        }
        //3. compare password
        const isMatch = await bcryptjs.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({
                success: false,
                error: "Password does not match!"
            })
        }

        //4. create token
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME
        })

        //5. set cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
            domain: process.env.COOKIE_DOMAIN ? process.env.COOKIE_DOMAIN : "localhost",
            sameSite: process.env.COOKIE_SAMESITE
        })

        res.status(200).json({
            success: true,
            result: {
                username: user.username,
                email: user.email,
                role: user.role,
                token: token
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.signout = async (req, res, next) => {
    try {
        if(!req.user){
            return res.status(401).json({
                success: false,
                error: "Unauthorization"
            })
        }

        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
            domain: process.env.COOKIE_DOMAIN ? process.env.COOKIE_DOMAIN : "localhost",
            sameSite: process.env.COOKIE_SAMESITE
        })


        res.status(200).json({
            success: true,
            result: "Signout successfully!"
        })
    } catch (error) {
        next(error)
    }
}

exports.me = async (req, res, next) => {
    try{
        
        if(!req.user){
            return res.status(401).json({
                success: false,
                error: "Unauthorization"
            })
        }

        res.status(200).json({
            success: true,
            result: req.user
        })
    }catch(error){
        next(error)
    }
}



