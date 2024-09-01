const express = require('express')
const { managerOrAdminAuthorization } = require('../middlewares/jsonwebtoken')
const { loginWithToken, login, register } = require('../controllers/auth')
const { getAllEmployees, getEvaluations } = require('../controllers/employees')
const {
  createEvaluation,
  getEvaluation,
  updateEvaluation
} = require('../controllers/evaluations')
const { sendFeedback } = require('../controllers/feedback')
const { getReport } = require('../controllers/employees')

// initialize router
const router = express.Router()

// routes
router.post('/auth/register', register)
router.post('/auth/login', login)
router.get('/auth/get-session/:refreshToken', loginWithToken)
router.get('/employees', getAllEmployees)
router.post('/evaluations', [managerOrAdminAuthorization], createEvaluation)
router.get('/evaluations/:id', [managerOrAdminAuthorization], getEvaluation)
router.put('/evaluations/:id', [managerOrAdminAuthorization], updateEvaluation)
router.get(
  '/evaluations/employee/:id',
  [managerOrAdminAuthorization],
  getEvaluations
)
router.post('/feedback', sendFeedback)
router.get('/reports/employee/:id', [managerOrAdminAuthorization], getReport)

module.exports = router
