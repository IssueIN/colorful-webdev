const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const Manufacturer = require('../models/manufacturer')
const imageMimeTypes = ['image/jpeg','image/png']
const dataSheetType = ['application/pdf']


//All Products Route
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({})
    .populate('manufacturer')
    .exec();
    res.render('products/index',{
      products: products,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

//New Products Route
router.get('/new', async (req, res) => {
  try {
    const packageCaseOptions = await Product.schema.path('packageCase').enumValues;
    const product = new Product()
    res.render('products/new', {
      product: product,
      packageCaseOptions: packageCaseOptions,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/products')
  }
})

//Create Products Route
router.post('/', async (req, res) =>{
  const pricingArray = req.body['qty[]'].map((q, index) => {
    return {qty: q, price: req.body['price[]'][index]}
  })

  const product = new Product({
    manufacturer: req.body.manufacturer,
    partNumber: req.body.partNumber,
    description: req.body.description,
    packaging: req.body.packaging,
    packageCase: req.body.packageCase,
    stock: req.body.stock,
    category: req.body.category,
    price: pricingArray,
  })
  
  saveFile(product, req.body.image, imageMimeTypes, 'image')
  saveFile(product, req.body.dataSheet, dataSheetType,'dataSheet')

  try {
    const newProduct = await product.save()
    //res.redirect(`/products/${newProduct.id}`)
    res.redirect('/products')
  } catch {
    renderNewPage(res, product, true)
  }
})

//Search Results Route
router.get('/results', async (req, res) => {
  let searchResults = []
  let query = Product.find()
  if (req.query.search != null && req.query.search !== '') {
    query = query.regex('partNumber', new RegExp(req.query.search, 'i'))
  }
  try {
    searchResults = await query.exec()
    if (searchResults.length > 0) {
      res.render('products/results', {
        searchOptions: req.query,
        searchResults: searchResults
      })
    } else {
      res.render('products/results', {
        searchOptions: req.query,
        searchResults: searchResults,
        errorMessage: "can't find items"
      })
    }
  } catch {
    res.redirect('/')
  }
})

//categories route
router.get('/:category', async(req, res) =>{
  try {
    const products = await Product.find({category: req.params.category}).populate('manufacturer').exec()
    res.render('products/show',{
      products: products,
      searchOptions: req.query,
      category: req.params.category
    })
  } catch {
    res.send('error!')
  }
})

async function renderNewPage(res, product, hasError = false) {
  try {
    const manufacturers = await Manufacturers.find({})
    const packageCaseOptions = await Product.schema.path('packageCase').enumValues
    const categoryOptions = await Product.schema.path('category').enumValues
    const params = {
      manufacturers: manufacturers,
      product: product,
      packageCaseOptions: packageCaseOptions,
      categoryOptions: categoryOptions
    }
    if (hasError) {
      params.errorMessage = 'Error Creating Product'
    }
    res.render(`products/new`, params)
  } catch {
    res.redirect('/products')
  }
}

function saveFile(product, fileEncoded, fileTypes, fieldName) {
  if (fileEncoded == null) return;
  const file = JSON.parse(fileEncoded);
  if (file !== null && fileTypes.includes(file.type)) {
      product[fieldName] = new Buffer.from(file.data, 'base64');
      const fieldType = fieldName + 'Type';
       product[fieldType] = file.type;
  }
}

// async function getQuery(searchText) {
//   let query = {};
//   if (searchText != null && searchText !== '') {
//     let manufacturerIds = await Manufacturer.find({ name: new RegExp(searchText, 'i') }).select('_id');
//     manufacturerIds = manufacturerIds.map(m => m._id);
//     const regex = new RegExp(searchText, 'i');
//     query = {
//       $or: [
//         { partNumber: regex },
//         { manufacturer: { $in: manufacturerIds } },
//         { packaging: regex },
//         { packageCase: regex },
//         { description: regex },
//         { category: regex }
//       ]
//     };
//   }
//   return query;
// }

module.exports = router