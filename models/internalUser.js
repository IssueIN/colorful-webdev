const mongoose = require('mongoose')

const internalUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['admin','default'],
    default: 'default',
    required: true
  }
})

module.exports = mongoose.model('internalUser', internalUserSchema)