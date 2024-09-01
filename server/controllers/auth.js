const joi = require('joi')
const bcrypt = require('bcrypt')
const Account = require('../models/Account')
const { signToken, decodeToken } = require('../middlewares/jsonwebtoken')

async function loginWithToken(request, response) {
  try {
    const { refreshToken } = request.params

    const decode = decodeToken(refreshToken)
    const { uid } = decode

    // Get account from DB, existence not verified because we are already authorized at this point
    const foundAccount = await Account.findOne({ _id: uid }).select('-password')

    // Generate access token
    const token = signToken(
      { uid: foundAccount._id, role: foundAccount.role },
      '1h'
    )

    response.status(200).json({
      message: 'Account fetched',
      data: foundAccount,
      token
    })
  } catch (error) {
    console.error(error)
    response.status(500).send()
  }
}

async function login(request, response) {
  try {
    // Validate request data
    await joi
      .object({
        username: joi.string().required(),
        password: joi.string().required()
      })
      .validateAsync(request.body)
  } catch (error) {
    return response.status(400).json({
      error: 'ValidationError',
      message: error.message
    })
  }

  try {
    const { username, password } = request.body

    // Get account from DB, and verify existence
    const foundAccount = await Account.findOne({ username })
    if (!foundAccount) {
      return response.status(400).json({
        message: 'Bad credentials'
      })
    }

    // Decrypt and verify password
    const passOk = await bcrypt.compare(password, foundAccount.password)
    if (!passOk) {
      return response.status(400).json({
        message: 'Bad credentials'
      })
    }

    // Remove password from response data
    foundAccount.password = undefined
    delete foundAccount.password

    // Generate access token
    const token = signToken({ uid: foundAccount._id, role: foundAccount.role })
    const refreshToken = signToken(
      { uid: foundAccount._id, role: foundAccount.role },
      '24h'
    )

    response.status(200).json({
      message: 'Successfully logged-in',
      data: foundAccount,
      token,
      refreshToken
    })
  } catch (error) {
    console.error(error)
    response.status(500).send()
  }
}

async function register(request, response) {
  try {
    // Validate request data
    await joi
      .object({
        username: joi.string().required(),
        password: joi.string().required(),
        role: joi.string()
      })
      .validateAsync(request.body)
  } catch (error) {
    return response.status(400).json({
      error: 'ValidationError',
      message: error.message
    })
  }

  try {
    const { username, password, role } = request.body

    // Verify account username as unique
    const existingAccount = await Account.findOne({ username })
    if (existingAccount) {
      return response.status(400).json({
        error: username,
        message: 'An account already exists with that "username"'
      })
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    // Create account
    const newAccount = new Account({ username, password: hash, role })
    await newAccount.save()

    // Remove password from response data
    newAccount.password = undefined
    delete newAccount.password

    // Generate access token
    const token = signToken(
      { uid: newAccount._id, role: newAccount.role },
      '1h'
    )
    const refreshToken = signToken(
      { uid: newAccount._id, role: newAccount.role },
      '24h'
    )

    response.status(201).json({
      message: 'Successfully registered',
      data: newAccount,
      token,
      refreshToken
    })
  } catch (error) {
    console.error(error)
    return response.status(500).send()
  }
}

module.exports = {
  loginWithToken,
  login,
  register
}
