const mongoose = require('mongoose')
const bilingualSchema = require('./_bilingual_schema')

const solutionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    default: 'solution',
  },
  name: {
    type: bilingualSchema,
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
    type: bilingualSchema,
    required: true
  },
  addedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

module.exports = mongoose.model('Solution', solutionSchema)