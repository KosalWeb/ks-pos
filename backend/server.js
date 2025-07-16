const dotenv = require("dotenv")
const app = require("./app");
const { connectToDatabase } = require("./database/db");

// config dotenv
dotenv.config()

// connect to database
connectToDatabase()

const port = process.env.PORT || 5000

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})