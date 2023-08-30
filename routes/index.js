const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const Manufacturer = require('../models/manufacturer')


router.get('/', async (req, res) => {
  let productsRecent
  let manufacturers
  try {
    productsRecent = await Product.find().sort({publishedAt: 'desc'}).limit(10).exec()
    manufacturers = await Manufacturer.find({}).exec()
     res.render('index',{
      searchOptions: req.query,
      productsRecent: productsRecent,
      manufacturers: manufacturers,
    })
  } catch {
    res.send('error entering main page!')
  }
})

module.exports = router