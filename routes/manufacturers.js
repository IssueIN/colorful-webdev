const express = require('express')
const router = express.Router()
const Manufacturer = require('../models/manufacturer')
const Product = require('../models/product')
const imageMimeTypes = ['image/jpeg','image/png']

//All Manufacturer Route
router.get('/', async (req, res) => {
  let searchOptions = {}
  if(req.query != null && req.query !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try {
    const manufacturers = await Manufacturer.find(searchOptions)
    res.render('manufacturers/index', {
      manufacturers: manufacturers,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  } 
})

//New Manufacturer Route
router.get('/new', (req, res) => {
  res.render('manufacturers/new', {
    manufacturer: new Manufacturer()
  })
})

//Create Manufacturer Route
router.post('/', async (req, res) => {
  const manufacturer = new Manufacturer({
    name: req.body.name
  })
  saveLogo(manufacturer, req.body.logo)

  try {
    const newManufacturer = await manufacturer.save()
    //res.redirect(`/manufacturers/${newManufacturer.id}`)
    res.render('manufacturers/index')
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
  if (logo !== null && imageMimeTypes,includes(logo.type)) {
    manufacturer.logoImage = new Buffer.from(logo.data, 'base64')
    book.logoImageType = logo.type
  }
}

module.exports = router