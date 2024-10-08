const mongoose = require('mongoose')

const instance = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'manager', 'employee'],
      default: 'employee'
    },
    evaluations: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
)

const modelName = 'Account'

module.exports = mongoose.model(modelName, instance)
