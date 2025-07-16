const { default: mongoose } = require("mongoose");

const schema = new mongoose.Schema({
    businessName: {
        type: String,
        unique: true,
        required: [true, "name is required"]
    },
    name: {
        type: String,
        required: [true, "name is required"]
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    note: {
        type: String
    }
}, {timestamps: true})

const Supplier = mongoose.model("Supplier", schema)

module.exports = Supplier
