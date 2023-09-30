const mongoose = require('mongoose')

const bilingualSchema = new mongoose.Schema({
  en: {type: String, required: true},
  zh: {type: String, required: true}
}, {_id: false})

module.exports = bilingualSchema;