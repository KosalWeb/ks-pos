const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "name is required"]
    },
    note: {
        type: String
    }
}, {timestamps: true})

const Category = mongoose.model("Category", schema)

module.exports = Category



