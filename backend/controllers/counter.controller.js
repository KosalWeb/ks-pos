const Counter = require("../models/counter.model")

exports.generateProductCode = async () => {
    const result = await Counter.findOneAndUpdate(
        {_id: "product_code"},
        {$inc: {sequcene_value: 1}},
        {new: true, upsert: true}
    )
    const productCode = String(result.sequcene_value).padStart(6, '0')
    return productCode
}

exports.generateInvoiceNumber = async () => {
    const result = await Counter.findOneAndUpdate(
        {_id: "invoice_number"},
        {$inc: {sequcene_value: 1}},
        {new: true, upsert: true}
    )
    const invoiceNumber = String(result.sequcene_value).padStart(6, '0')
    return invoiceNumber
}