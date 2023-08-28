const mongoose = require('mongoose')

const manufacturerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  logo: {
    type: Buffer,
    required: true
  },
  logoImageType: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Manufacturer', manufacturerSchema)