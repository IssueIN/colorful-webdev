const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const Manufacturer = require('../models/manufacturer')

//All Products Route
router.get('/', async (req, res) => {
  try {
    const products = Product.find({})
    res.render('products/index',{
      products: products
    })
  } catch {
    res.redirect('/')
  }
})

module.exports = router

