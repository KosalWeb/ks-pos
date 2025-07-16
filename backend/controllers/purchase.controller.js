const calcuatePaymentStatus = require("../helpers/calculatePaymentStatus")
const Product = require("../models/product.model")
const Purchase = require("../models/purchase.model")

exports.create = async (req, res, next) => {
    try {
        const {items, totalCost, purchaseStatus} = req.body
        const paymentStatus = calcuatePaymentStatus(totalCost, 0)

        //1). update stock product if purchase status equal recevied
        if(purchaseStatus === "received"){
            for(const item of items){
                const product = await Product.findById(item.product)
                if(!product){
                    return res.status(404).json({
                        success: false,
                        error: `Product with ID ${product.name} not found!`
                    })
                }
                product.currentStock = (product.currentStock || 0) + item.quantity
                await product.save()
            }
        }

        //2). Insert purchase record into the database
        const newDoc = await Purchase.create({
            ...req.body,
            paymentStatus,
            dueAmount: totalCost,
            user: req.user?._id,
            items,

        })

        res.status(201).json({
            success: true,
            result: newDoc
        })
    } catch (error) {
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

        const docs = await Purchase
                            .find(querySearch)
                            .populate("user", "username role")
                            .populate("supplier", "businessName phone")
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

        const totalItems = await Purchase.find(querySearch).countDocuments()
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
        const doc = await Purchase
                            .findById(id)
                            .populate("user", "username role")
                            .populate("supplier", "businessName phone")
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

exports.updatePurchaseStatus = async (req, res, next) => {
    try{
        const id = req.params.id
        const {purchaseStatus} = req.body
        
        const doc = await Purchase.findById(id)
        if(!doc){
            return res.status(404).json({
                success: false,
                error: "No document found with that ID"
            })
        }

        // 1. check if purchase status is already recevied
        if(doc.purchaseStatus === "received"){
            return res.status(400).json({
                success: false,
                error: "Purchase status is already recevied"
            })
        }

        //2. update stock
        if(purchaseStatus === "received"){
            for(const item of doc.items){
                const product = await Product.findById(item.product)
                if(!product){
                    return res.status(404).json({
                        success: false,
                        error: `Product with ID ${product.name} not found!`
                    })
                }
                product.currentStock = (product.currentStock || 0) + item.quantity
                await product.save()
            }
        }

        const newDoc = await Purchase.findByIdAndUpdate(id, {
            purchaseStatus
        })

        res.status(200).json({
            success: true,
            result: newDoc
        })
    }catch(error){
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
        const purchase = await Purchase.findById(id)
        if(!purchase){
            return res.status(404).json({
                success: false,
                error: "Purchase not found with that ID!"
            })
        }

        //2). Calculate the new payment status and due amount
        const totalCost = purchase.totalCost
        const newPaidAmount = purchase.paidAmount + paidAmount

            // Calulate new due amount
        const newDueAmount = Math.max(0, totalCost - newPaidAmount)

        const changeAmount = Math.max(0, newPaidAmount - totalCost)
            
            // Determine new payment status
        const paymentStatus = calcuatePaymentStatus(totalCost, newPaidAmount)

        //3). Update the sale with new payment details
        const updatedPurchase = await Purchase.findByIdAndUpdate(id, {
            paidAmount: newPaidAmount,
            paymentStatus: paymentStatus,
            dueAmount: newDueAmount,
            changeAmount: changeAmount
        })

        res.status(200).json({
            success: true,
            result: updatedPurchase
        })

    }catch(error){
        next(error)
    }
}


