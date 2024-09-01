const mongoose = require('mongoose')

const instance = new mongoose.Schema(
  {
    evaluationId: {
      type: String,
      required: true
    },
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    feedback: {
      type: Array,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const modelName = 'Feedback'

module.exports = mongoose.model(modelName, instance)
