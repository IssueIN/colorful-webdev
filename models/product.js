const mongoose = require('mongoose')
const bilingualSchema = require('./_bilingual_schema')
const { packageCaseOptions, categoryOptions } = require('./_enumValues')

const pricingSchema = new mongoose.Schema({
  qty: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, { _id: false })

const productSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    default: 'product',
  },
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
    type: bilingualSchema,
    required: true
  },
  packaging: {
    type: bilingualSchema,
    required: true
  },
  packageCase: {
    type: bilingualSchema,
    enum: packageCaseOptions,
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
  dataSheetType: {
    type: String,
    //required: true
  },
  publishedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  category: {
    type: bilingualSchema,
    enum: categoryOptions,
    required: true
  }
})

productSchema.virtual('imagePath').get(function() {
  if (this.image != null && this.imageType != null) {
    return `data:${this.imageType};charset=utf-8;base64,${this.image.toString('base64')}`
  }
})

productSchema.virtual('dataSheetPath').get(function() {
  if (this.dataSheet != null && this.dataSheetType != null) {
    return `data:${this.dataSheetType};charset=utf-8;base64,${this.dataSheet.toString('base64')}`
  }
})

module.exports = mongoose.model('Product', productSchema)
