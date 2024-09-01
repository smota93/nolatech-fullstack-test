const mongoose = require('mongoose')

const instance = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    questions: {
      type: Array,
      required: true
    },
    answers: {
      type: Array,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const modelName = 'Evaluation'

module.exports = mongoose.model(modelName, instance)
