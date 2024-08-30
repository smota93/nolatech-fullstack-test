const express = require('express')
// const { authorizeBearerToken } = require('../middlewares/jsonwebtoken')
const getAll = require('../controllers/employees/get-all')

// initialize router
const router = express.Router()

// GET at route: http://localhost:8080/employees
router.get('/employees', [], getAll)

module.exports = router