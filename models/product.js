const mongoose = require('mongoose')

const pricingSchema = new mongoose.Schema({
  qty: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

const productSchema = new mongoose.Schema({
  image: {
    type: Buffer,
    required: true
  },
  imageType: {
    type: String,
    required: true
  },
  partNumber: {
    type: String,
    required: true
  },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'Manufacturer'
  },
  description: {
    type: String,
    required: true
  },
  packaging: {
    type: String,
    required: true
  },
  packageCase: {
    type: String,
    enum: ['Tape & Reel', 'Cut Tape','Digi-Reel'],
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  price: {
    type: [pricingSchema],
    required: true
  },
  dataSheet: {
    type: Buffer
    //required: true
  },
  publishedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  category: {
    type: String,
    enum: ['cat1', 'cat2', 'cat3', 'cat4','cat5','cat6'],
    required: true
  }
})

module.exports = mongoose.model('Product', productSchema)


