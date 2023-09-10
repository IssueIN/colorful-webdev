const express = require('express')
const router = express.Router()
const Manufacturer = require('../models/manufacturer')
const Product = require('../models/product')
const imageMimeTypes = ['image/jpeg','image/png']
const { checkAuthenticated } = require('../authMiddleware');

//All Manufacturer Route
router.get('/', async (req, res) => {
  try {
    const manufacturers = await Manufacturer.find({})
     res.render('manufacturers/index', {
      manufacturers: manufacturers,
    })
  } catch {
    res.redirect('/')
  } 
})

//New Manufacturer Route
router.get('/new', checkAuthenticated, (req, res) => {
  res.render('manufacturers/new', {
    manufacturer: new Manufacturer(),
  })
})

//Create Manufacturer Route
router.post('/', checkAuthenticated, async (req, res) => {
  const manufacturer = new Manufacturer({
    name: req.body.name
  })
  saveLogo(manufacturer, req.body.logo)

  try {
    const newManufacturer = await manufacturer.save()
    //res.redirect(`/manufacturers/${newManufacturer.id}`)
    res.redirect('/manufacturers')
  } catch {
    res.render('manufacturers/new', {
      manufacturer: manufacturer,
      errorMessage: 'Error creating Manufacturer'
    })
  }  
})

function saveLogo(manufacturer, logoEncoded) {
  if (logoEncoded == null || logoEncoded == '') return
  const logo = JSON.parse(logoEncoded)
  if (logo !== null && imageMimeTypes.includes(logo.type)) {
    manufacturer.logoImage = new Buffer.from(logo.data, 'base64')
    manufacturer.logoImageType = logo.type
  }
}

module.exports = router