const Account = require('../models/Account')
const Feedback = require('../models/Feedback')
const ObjectId = require('mongodb').ObjectId

async function getAllEmployees(_, response) {
  try {
    const employees = await Account.find({ role: 'employee' })

    response.status(200).json({
      message: 'Accounts fetched',
      data: employees
    })
  } catch (error) {
    console.error(error)
    response.status(500).send()
  }
}

async function getEvaluations(request, response) {
  try {
    const { id } = request.params
    const employee = await Account.findOne({
      _id: ObjectId.createFromHexString(id)
    })

    if (!employee) {
      return response.status(404).json({
        error: id,
        message: "There is no employee registered with that 'id'"
      })
    }

    response.status(200).json({
      message: `Evaluations for the employee ${employee.username} fetched`,
      data: employee.evaluations
    })
  } catch (error) {
    console.error(error)
    response.status(500).send()
  }
}

async function getReport(request, response) {
  try {
    const { id } = request.params
    const employee = await Account.findOne({
      _id: ObjectId.createFromHexString(id)
    })

    if (!employee) {
      return response.status(404).json({
        error: id,
        message: "There is no employee registered with that 'id'"
      })
    }

    // Generate the feedback groups
    let selfFeedbacks = []
    let managerFeedbacks = []
    let adminFeedbacks = []
    let peerFeedbacks = []

    if (employee.evaluations.length > 0) {
      for (let id of employee.evaluations) {
        const feedback = await Feedback.findOne({
          _id: ObjectId.createFromHexString(id)
        })

        if (feedback.from === id) selfFeedbacks.push(feedback)

        const user = await Account.findOne({
          _id: ObjectId.createFromHexString(feedback.from)
        })

        if (user.role === 'manager') managerFeedbacks.push(feedback)

        if (user.role === 'admin') adminFeedbacks.push(feedback)

        if (user.role === 'employee') peerFeedbacks.push(feedback)
      }
    }

    // Util rounded function
    const rounded = (num) => Number(`${Math.round(`${num}e2`)}e-2`)

    // Calculate the averages
    const selfAverage =
      selfFeedbacks.length > 0
        ? rounded(
            selfFeedbacks.reduce(
              (score, selfFeedback) =>
                selfFeedback.feedback.reduce((acc, point) => point + acc, 0) /
                  selfFeedback.feedback.length +
                score,
              0
            ) / selfFeedbacks.length
          )
        : 0

    const managerAverage =
      managerFeedbacks.length > 0
        ? rounded(
            managerFeedbacks.reduce(
              (score, managerFeedback) =>
                managerFeedback.feedback.reduce(
                  (acc, point) => point + acc,
                  0
                ) /
                  managerFeedback.feedback.length +
                score,
              0
            ) / managerFeedbacks.length
          )
        : 0

    const adminAverage =
      adminFeedbacks.length > 0
        ? rounded(
            adminFeedbacks.reduce(
              (score, adminFeedback) =>
                adminFeedback.feedback.reduce((acc, point) => point + acc, 0) /
                  adminFeedback.feedback.length +
                score,
              0
            ) / adminFeedbacks.length
          )
        : 0

    const peerAverage =
      peerFeedbacks.length > 0
        ? rounded(
            peerFeedbacks.reduce(
              (score, peerFeedback) =>
                peerFeedback.feedback.reduce((acc, point) => point + acc, 0) /
                  peerFeedback.feedback.length +
                score,
              0
            ) / peerFeedbacks.length
          )
        : 0

    response.status(200).json({
      message: `Report for the employee ${employee.username} fetched`,
      data: {
        selfFeedbacks,
        selfAverage,
        managerFeedbacks,
        managerAverage,
        adminFeedbacks,
        adminAverage,
        peerFeedbacks,
        peerAverage
      }
    })
  } catch (error) {
    console.error(error)
    response.status(500).send()
  }
}

module.exports = {
  getAllEmployees,
  getEvaluations,
  getReport
}
