const Customer = require("../models/customer.model")
const Product = require("../models/product.model")
const Purchase = require("../models/purchase.model")
const Sale = require("../models/sale.model")
const Supplier = require("../models/supplier.model")

exports.generalReport = async (req, res, next) => {
    try {
        // 1. find revenue today
        const startOfToday = new Date( new Date().setHours(0,0,0,0))
        const endOfToday = new Date(  new Date().setHours(23,59,59,999))
        const todaySales = await Sale.find({
            createdAt: {
                $gte: startOfToday,
                $lte: endOfToday
            }
        }, {
            totalCost: 1
        })

        const totalSaleToday = todaySales.reduce((sum, sale) => {
            return sum + sale.totalCost;
        },0)


        //2). total due amount
        const dueSales = await Sale.find({
            paymentStatus: 'due'
        }, {
            totalCost: 1
        })

        const totalDueAmountSale = dueSales.reduce((sum, sale) => {
            return sum + sale.totalCost;
        },0)


        //3). total due amount purchase
        const duePurchaes = await Purchase.find({
            paymentStatus: 'due'
        },{totalCost: 1})
        const totalDueAmountPurchase = dueSales.reduce((sum, purchase) => {
            return sum + purchase.totalCost;
        },0)

        //4). monthly sale
        const monthStart = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            1
        ).setHours(0,0,0,0)

        const monthEnd = new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0
        ).setHours(23,59,59,999)

        const monthlySales = await Sale.find({
            createdAt: {
                $gte: monthStart,
                $lte: monthEnd
            }
        }, { totalCost: 1 })

        const totalMonthlySale = monthlySales.reduce((sum, sale) => {
            return sum + sale.totalCost;
        },0)

        // count all customers
        const totalCustomers = await Customer.countDocuments()
        // count all suppliers
        const totalSuppliers = await Supplier.countDocuments()
        // count all due purchase
        const totalPurchaseDue = await Purchase.find({paymentStatus: "due"}).countDocuments()
        // count all due sale
        const totalSaleDue = await Sale.find({paymentStatus: "due"}).countDocuments()

        res.status(200).json({
            success: true,
            result: {
                totalSaleToday,
                totalDueAmountSale,
                totalDueAmountPurchase,
                totalMonthlySale,
                totalCustomers,
                totalSuppliers,
                totalPurchaseDue,
                totalSaleDue
            }
        })
    } catch (error) {
        next(error)
    }
}

exports.saleReport = async (req, res, next) => {
    try{

    if(!req.query?.startDate || !req.query?.endDate){
        return res.status(400).json({
            success: false,
            error: "Start date and End date are required"
        })
    }

    const startDate = new Date(req.query.startDate).setHours(0,0,0,0)
    const endDate = new Date(req.query.endDate).setHours(23,59,59,999)

    const sales = await Sale.find({
        createdAt: {
            $gte: startDate,
            $lte: endDate
        }
    })
    .populate("customer", "name phone")
    .populate("user", "username email role")

    const totalAmount = sales.reduce((sum, sale) => {
        return sum + sale.totalCost
    },0)

        res.status(200).json({
            success: true,
            totalAmount,
            result: sales
        })
    }catch(error){
        next(error)
    }
}

exports.stockReport = async (req, res, next) => {
    try{
        
        if(!req.query?.stockQty){
            return res.status(400).json({
                success: false,
                error: "Please provide stock qty"
            })
        }

        const docs = await Product.find({
            currentStock: {
                $lte: req.query.stockQty * 1   
            }
        }).populate("category", "name")

        res.status(200).json({
            success: true,
            result: docs
        })
    }catch(error){
        next(error)
    }
}

exports.salereportIn30Days = async (req, res, next) => {
    try{
        const thirtyDaysAgo = new Date()
        thirtyDaysAgo.setDate( thirtyDaysAgo.getDate() - 30)
        
        const sales = await Sale.find({
            createdAt: {
                $gte: thirtyDaysAgo
            }
        }, {
            createdAt: 1,
            totalCost:1
        })

        res.status(200).json({
            success: true,
            result: sales
        })
        
    }catch(error){
        next(error)
    }
}