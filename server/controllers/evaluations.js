const joi = require('joi')
const ObjectId = require('mongodb').ObjectId
const Evaluation = require('../models/Evaluation')

async function createEvaluation(request, response) {
  try {
    // Validate request data
    await joi
      .object({
        title: joi.string().required(),
        questions: joi.array().min(1).required(),
        answers: joi.array().min(1).required()
      })
      .validateAsync(request.body)
  } catch (error) {
    return response.status(400).json({
      error: 'ValidationError',
      message: error.message
    })
  }

  try {
    const { title, questions, answers } = request.body

    // Verify the title is unique
    const existingTitle = await Evaluation.findOne({ title })
    if (existingTitle) {
      return response.status(400).json({
        error: title,
        message: 'An evaluation already exists with that "title"'
      })
    }

    // Create evaluation
    const newEvaluation = new Evaluation({ title, questions, answers })
    await newEvaluation.save()

    response.status(201).json({
      message: 'Successfully created',
      data: newEvaluation
    })
  } catch (error) {
    console.error(error)
    response.status(500).send()
  }
}

async function getEvaluation(request, response) {
  try {
    const { id } = request.params
    const evaluation = await Evaluation.find({
      _id: ObjectId.createFromHexString(id)
    })

    if (!evaluation) {
      return response.status(404).json({
        error: id,
        message: "There is no evaluation registered with that 'id'"
      })
    }

    response.status(200).json({
      message: 'Evaluation fetched',
      data: evaluation
    })
  } catch (error) {
    console.error(error)
    response.status(500).send()
  }
}

async function updateEvaluation(request, response) {
  try {
    // Validate request data
    await joi
      .object({
        title: joi.string().required(),
        questions: joi.array().min(1).required(),
        answers: joi.array().min(1).required()
      })
      .validateAsync(request.body)
  } catch (error) {
    return response.status(400).json({
      error: 'ValidationError',
      message: error.message
    })
  }

  try {
    const { id } = request.params
    const { title, questions, answers } = request.body

    // Verify the title is unique
    const existingTitle = await Evaluation.findOne({ title })
    if (existingTitle) {
      return response.status(400).json({
        error: title,
        message: 'An evaluation already exists with that "title"'
      })
    }

    // Update evaluation
    await Evaluation.updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: { title, questions, answers } }
    )

    response.status(200).json({
      message: 'Successfully updated'
    })
  } catch (error) {
    console.error(error)
    response.status(500).send()
  }
}

module.exports = {
  createEvaluation,
  getEvaluation,
  updateEvaluation
}
