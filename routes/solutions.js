const express = require('express')
const router = express.Router()
const Solution = require('../models/solution')
const imageMimeTypes = ['image/jpeg','image/png']
const { checkAuthenticated } = require('../authMiddleware');

//All Solutions Route
router.get('/', async (req, res) => {
  try {
    let query = Solution.find();
    if(req.query.name) {
      query = query.where('name', req.query.name);
    }

    const solution = await query.exec();
     res.render('solutions/index', {
      solution: solution,
      searchOptions: req.query,
      name: req.query.name
    })
  } catch {
    res.redirect('/')
  } 
})

//New Solution Route
router.get('/new', checkAuthenticated, (req, res) => {
  res.render('solutions/new', {
    solution: new Solution(),
    searchOptions: req.query
  })
})

//Create Solution Route
router.post('/', checkAuthenticated, async (req, res) => {
  const solution = new Solution({
    name: req.body.name,
    description: req.body.description
  })
  saveImg(solution, req.body.img)

  try {
    const newSolution = await solution.save()
    //res.redirect(`/manufacturers/${newManufacturer.id}`)
    res.redirect('/solutions')
  } catch {
    res.render('solutions/new', {
      solution: solution,
      errorMessage: 'Error creating Solution'
    })
  }  
})

function saveImg(solution, ImgEncoded) {
  if (ImgEncoded == null || ImgEncoded == '') return
  const img = JSON.parse(ImgEncoded)
  if (img !== null && imageMimeTypes.includes(img.type)) {
    solution.image = new Buffer.from(img.data, 'base64')
    solution.imageType = img.type
  }
}

module.exports = router