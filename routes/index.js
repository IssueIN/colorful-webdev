const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const Manufacturer = require('../models/manufacturer')

router.get('/', async (req, res) => {
  let productsRecent
  try {
    productsRecent = await Product.find().sort({publishedAt: 'desc'}).limit(10).exec()
    res.render('index',{
      searchOptions: req.query,
      productsRecent: productsRecent,
    })
  } catch {
    res.send('error entering main page!')
  }
})

//About us route
router.get('/about-us', (req, res) => {
  res.send('this is about us page')
})

//contact us route
router.get('/contact-us', (req, res) => {
  res.send('this is contact us page')
})

//join us route
router.get('/join-us', (req, res) => {
  res.send('this is join us page')
})


module.exports = router