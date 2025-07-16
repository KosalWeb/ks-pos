
function calcuatePaymentStatus (totalCost, paidAmount){
    if(paidAmount >= totalCost) return "paid"
    if(paidAmount === 0) return "due"
    return "partial"
}

module.exports = calcuatePaymentStatus