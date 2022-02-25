const express = require('express')
const Cart = require('../models/Cart')
const router = express.Router({ mergeParams: true })

// /api/cart
router
  .route('/')
  .get(async (req, res) => {
    try {
      const list = await Cart.find()
      res.send(list)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже'
      })
    }
  })
  .post(async (req, res) => {
    try {
      const addNewProductToCart = await Cart.create({
        ...req.body
      })
      res.status(201).send(addNewProductToCart)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже'
      })
    }
  })

router.delete('/:cartProductId',  async (req, res) => {
  try {
    const { cartProductId } = req.params
    const removedProductFromCart = await Comment.findById(cartProductId)
    await removedProductFromCart.remove()
    return res.send(null)
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
})

module.exports = router