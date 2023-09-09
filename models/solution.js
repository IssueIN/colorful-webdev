const mongoose = require('mongoose')

const solutionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    default: 'solution',
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: Buffer,
    required: true
  },
  imageType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  addedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Solution', solutionSchema)