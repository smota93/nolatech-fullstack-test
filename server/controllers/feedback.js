const joi = require('joi')
const ObjectId = require('mongodb').ObjectId
const Account = require('../models/Account')
const Feedback = require('../models/Feedback')

async function sendFeedback(request, response) {
  try {
    // Validate request data
    await joi
      .object({
        evaluationId: joi.string().required(),
        to: joi.string().required(),
        feedback: joi.array().min(1).required()
      })
      .validateAsync(request.body)
  } catch (error) {
    return response.status(400).json({
      error: 'ValidationError',
      message: error.message
    })
  }

  try {
    const { uid } = request.user
    const { evaluationId, to, feedback } = request.body
    const toId = ObjectId.createFromHexString(to)

    // Check if the evaluated employee exist
    const employee = await Account.findOne({ _id: toId })
    if (!employee) {
      return response.status(400).json({
        error: to,
        message: "There is no employee registered with that 'id'"
      })
    }

    // Create feedback
    const newFeedback = new Feedback({ evaluationId, from: uid, to, feedback })
    await newFeedback.save()

    // Add feedback to the evaluations array
    await Account.updateOne(
      { _id: toId },
      {
        $set: {
          evaluations: [...employee.evaluations, newFeedback._id.toString()]
        }
      }
    )

    response.status(200).json({
      message: 'Feedback sent',
      data: newFeedback
    })
  } catch (error) {
    console.error(error)
    response.status(500).send()
  }
}

module.exports = {
  sendFeedback
}
