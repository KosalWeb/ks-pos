const calcuatePaymentStatus = require("../helpers/calculatePaymentStatus")
const Product = require("../models/product.model")
const Sale = require("../models/sale.model")
const { generateInvoiceNumber } = require("./counter.controller")


exports.create = async (req, res, next) => {
    try{
        let {items, totalCost, paidAmount, customer} = req.body
        if(!paidAmount){
            paidAmount = 0
        }
        //step 1: Fetch all products at once to validate stock
        const productIds = items.map(it => it.product)
        const products = await Product.find({_id: { $in: productIds }})
  
        //step 2: Validate stock for each product
        const productUpdates = []
        for(const item of items){
            const product = products.find(
                (p) => p._id.toString() === item.product.toString()
            )
            if(!product){
                return res.status(404).json({
                    success: false,
                    error: `Product not found with ID: ${item.product}`
                })
            }
            if(product.currentStock < item.quantity){
                return res.status(400).json({
                    success: false,
                    error: `Insufficient stock for product: ${product.name}`
                })
            }

            productUpdates.push({
                updateOne: {
                    filter: {_id: product._id},
                    update: {$inc: { currentStock: -item.quantity  }}
                }
            })
        }
        //step 3: Execute the stock updates in bulk
        await Product.bulkWrite(productUpdates)
        //step 4: Calculate payment status
        const paymentStatus = calcuatePaymentStatus(totalCost, paidAmount)
        //step 5: Generate invoice number
        const invoiceNumber = await generateInvoiceNumber()
        //step 6: Calculate due amount
        const dueAmount = Math.max(0, totalCost - paidAmount)
        //step 7: Calculate change amount
        const changeAmount = Math.max(0, paidAmount - totalCost)
        //step 8: Create new Sale
        const newSale = await Sale.create({
            user: req.user._id,
            customer,
            invoiceNumber,
            paymentStatus,
            dueAmount,
            changeAmount,
            paidAmount,
            totalCost,
            items: items
        })

        res.status(201).json({
            success: true,
            result: newSale
        })
    }catch(error){
        next(error)
    }
}


exports.findAll = async (req, res, next) => {
    try {
        const page = req.query.page * 1 || 1
        const limit = req.query.limit * 1 || 10
        const skip = (page - 1) * limit
        const querySearch = {}

        if(req.query.search){
            querySearch["$or"] = [
                {invoiceNumber: { $regex: req.query.search, $options: "i" }}
            ]
        }

        const docs = await Sale
                            .find(querySearch)
                            .populate("user", "username role")
                            .populate("customer", "name phone")
                            .populate({
                                path: "items",
                                populate: {
                                    path: "product",
                                    select: "name imageUrl salePrice costPrice currentStock"
                                }
                            })
                            .skip(skip)
                            .limit(limit)
                            .sort({_id: -1})
                            .exec()

        const totalItems = await Sale.find(querySearch).countDocuments()
        const totalPage = Math.ceil(totalItems / limit)

        res.status(200).json({
            success: true,
            totalPage,
            result: docs
        })
    } catch (error) {
        next(error)
    }
}

exports.findOne = async (req, res, next) => {
    try {
        const id = req.params.id  
        const doc = await Sale
                            .findById(id)
                            .populate("user", "username role")
                            .populate("customer", "name phone")
                            .populate({
                                path: "items",
                                populate: {
                                    path: "product",
                                    select: "name imageUrl salePrice costPrice currentStock"
                                }
                            })
        if(!doc){
            return res.status(404).json({
                success: false,
                error: "Document not found with that ID!"
            })
        }
        res.status(200).json({
            success: true,
            result: doc
        })
    } catch (error) {
        next(error)
    }
}

exports.checkStock = async (req, res, next) => {
    try {

        const stock = req.query.stock * 1
        const product = req.query.product

        if(!stock || !product){
            return res.status(400).json({
                success:false,
                error: "Please provide stock and product"
            })
        }

        const doc = await Product.findById(product)
        if(!doc){
            return res.status(404).json({
                success: false,
                error: "Product not found!"
            })
        }

        if(doc.currentStock < stock){
            return res.status(400).json({
                success: false,
                error: `Insufficient stock for product: ${doc.name}`
            })
        }

        res.status(200).json({
            success: true,
            result: {}
        })
    } catch (error) {
        next(error)
    }
}

exports.addPayment = async (req, res, next) => {
    try{
        const id = req.params.id
        const paidAmount = req.body?.paidAmount 

        if(!paidAmount){
            return res.status(400).json({
                success: false,
                error: "Please provide paid amount!"
            })
        }


        //1). Find the sale using id
        const doc = await Sale.findById(id)
        if(!doc){
            return res.status(404).json({
                success: false,
                error: "Sale not found with that ID!"
            })
        }

        //2). Calculate the new payment status and due amount
        const totalCost = doc.totalCost
        const newPaidAmount = doc.paidAmount + paidAmount

            // Calulate new due amount
        const newDueAmount = Math.max(0, totalCost - newPaidAmount)

        const changeAmount = Math.max(0, newPaidAmount - totalCost)
            
            // Determine new payment status
        const paymentStatus = calcuatePaymentStatus(totalCost, newPaidAmount)

        //3). Update the sale with new payment details
        const updatedSale = await Sale.findByIdAndUpdate(id, {
            paidAmount: newPaidAmount,
            paymentStatus: paymentStatus,
            dueAmount: newDueAmount,
            changeAmount: changeAmount
        })

        res.status(200).json({
            success: true,
            result: updatedSale
        })

    }catch(error){
        next(error)
    }
}

