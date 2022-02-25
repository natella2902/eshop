const express = require('express')
const Product = require('../models/Products')
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {
    try {
        const list = await Product.find()
        res.status(200).send(list)
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})

router.patch('/:productId', auth, async (req, res) => {
    const { productId } = req.params
    try {
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, {new: true})
        res.send(updatedProduct)
    } catch (e) {
        res.status(500).json({
            message: e.message
        })
    }
})

module.exports = router