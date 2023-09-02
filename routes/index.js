const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const Manufacturer = require('../models/manufacturer')
const fs = require('fs');
const path = require('path');

router.get('/', async (req, res) => {
  let productsRecent
  try {
    productsRecent = await Product.find().sort({publishedAt: 'desc'}).limit(10).exec()

    const carouselPath = path.join(__dirname, '../public/uploads/carousel-img');

    fs.readdir(carouselPath, (err, files) => {
      if (err) {
        console.error('Could not list the directory.', err);
        return;
      }
      
      const imageFiles = files.filter(file => ['.jpg', '.png', '.gif', '.jpeg'].includes(path.extname(file).toLowerCase()));
      const imageCount = imageFiles.length;
      const imagePaths = imageFiles.map(fileName => path.join(carouselPath, fileName));
      const carouselImgPaths = pathModify(imagePaths);

      res.render('index',{
        searchOptions: req.query,
        productsRecent: productsRecent,
        carouselImgCount: imageCount,
        carouselImgPaths: carouselImgPaths,
      })
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

function pathModify(paths) {
  const baseDirectory = 'C:\\Users\\13410\\Desktop\\Website-coding\\colorful-website\\public';
  const modifiedPaths = paths.map(path => 
    path.replace(baseDirectory, '').replace(/\\/g, '/')
  );
  return modifiedPaths;
}

module.exports = router