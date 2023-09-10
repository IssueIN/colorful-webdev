const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin','default'],
    default: 'default',
    required: true
  }
})

module.exports = mongoose.model('user', userSchema)