const Category = require("../models/category.model")

exports.create = async (req, res, next) => {
    try {
        const newDoc = await Category.create(req.body)

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
                {name: { $regex: req.query.search, $options: "i" }}
            ]
        }

        const docs = await Category
                            .find(querySearch)
                            .skip(skip)
                            .limit(limit)
                            .sort({_id: -1})
                            .exec()

        const totalItems = await Category.find(querySearch).countDocuments()
        const totalPage = Math.ceil(totalItems / limit)

        res.status(201).json({
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
        const doc = await Category.findById(id)
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

exports.update = async (req, res, next) => {
    try {
        const id = req.params.id  
        const doc = await Category.findByIdAndUpdate(id, req.body)
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

exports.remove = async (req, res, next) => {
    try {
        const id = req.params.id  
        const doc = await Category.findByIdAndDelete(id)
        if(!doc){
            return res.status(404).json({
                success: false,
                error: "Document not found with that ID!"
            })
        }
        res.status(201).json({
            success: true,
            result: "Deleted successfully!"
        })
    } catch (error) {
        next(error)
    }
}