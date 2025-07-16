const { default: mongoose } = require("mongoose")

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected")
    } catch (error) {
        console.error(error.message)
    }
}

module.exports = {
    connectToDatabase
}