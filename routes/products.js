const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const Manufacturer = require('../models/manufacturer')
const imageMimeTypes = ['image/jpeg','image/png']
const dataSheetType = ['application/pdf']
const { checkAuthenticated } = require('../authMiddleware');
const { packageCaseOptions, categoryOptions } = require('../models/_enumValues')

// //All Products Route
// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find({})
//     .populate('manufacturer')
//     .exec();
//     res.render('products/index',{
//       products: products,
//       searchOptions: req.query
//     })
//   } catch {
//     res.redirect('/')
//   }
// })

router.get('/', async (req, res) =>{
  try {
    const lang = req.language.split('-')[0];
    let query = Product.find().populate('manufacturer');

    if(req.query.category) {
      query = query.where(`category.${lang}`, req.query.category);
    }

    if(req.query.manufacturer) {
      const manufacturer = await Manufacturer.findOne({'name': req.query.manufacturer});
      if (manufacturer) {
        query = query.where('manufacturer', manufacturer.id);
      }
    }

    const products = await query.exec();

    res.render('products/index', {
      products: products,
      category: req.query.category,
      manufacturer: req.query.manufacturer,
    })

  } catch (err) {
    console.log(err)
    res.redirect('/')
  }
})

//New Products Route
router.get('/new', checkAuthenticated, async (req, res) => {
  try {
    const lang = req.language.split('-')[0];
    const packageCase = packageCaseOptions.map(value => value[lang])
    const product = new Product()
    res.render('products/new', {
      product: product,
      packageCaseOptions: packageCase,
    })
  } catch {
    res.redirect('/products')
  }
})

//Create Products Route
router.post('/', checkAuthenticated, async (req, res) =>{
  const pricingArray = req.body['qty[]'].map((q, index) => {
    return {qty: q, price: req.body['price[]'][index]}
  })

  const description = bilingualObject(req.body['description[]'])
  const packaging = bilingualObject(req.body['packaging[]'])
  const selectedCategory = categoryOptions.find(category => category.en === req.body.category || category.zh === req.body.category);
  const selectedPackageCase = packageCaseOptions.find(option => option.en === req.body.packageCase || option.zh === req.body.packageCase);

  const product = new Product({
    manufacturer: req.body.manufacturer,
    partNumber: req.body.partNumber,
    description: description,
    packaging: packaging,
    packageCase: selectedPackageCase,
    stock: req.body.stock,
    category: selectedCategory,
    price: pricingArray,
  })
  
  saveFile(product, req.body.image, imageMimeTypes, 'image')
  //saveFile(product, req.body.dataSheet, dataSheetType,'dataSheet')

  try {
    const newProduct = await product.save()
    //res.redirect(`/products/${newProduct.id}`)
    res.redirect('/products')
  } catch (err) {
    console.log(err)
    renderNewPage(req, res, product, true)
  }
})

//Search Results Route
router.get('/results', async (req, res) => {
  let searchResults = []
  let query = Product.find().populate('manufacturer');
  if (req.query.search != null && req.query.search !== '') {
    query = query.regex('partNumber', new RegExp(req.query.search, 'i'))
  }
  try {
    searchResults = await query.exec()
    if (searchResults.length > 0) {
      res.render('products/results', {
        searchResults: searchResults
      })
    } else {
      res.render('products/results', {
        searchResults: searchResults,
        errorMessage: "can't find items"
      })
    }
  } catch {
    res.redirect('/')
  }
})


async function renderNewPage(res, req, product, hasError = false) {
  try {
    const manufacturers = await Manufacturers.find({})
    const lang = req.language.split('-')[0];
    const packageCase = packageCaseOptions.map(value => value[lang])
    const category = categoryOptions.map(value => value[lang])
    const params = {
      manufacturers: manufacturers,
      product: product,
      packageCaseOptions: packageCase,
      categoryOptions: category
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

function bilingualObject(bilingualArray) {
  return {
    en: bilingualArray[0],
    zh: bilingualArray[1]
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