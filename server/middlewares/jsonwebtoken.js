const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants')

const signToken = (payload = {}, expiresIn = '12h') => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn })

  return token
}

const decodeToken = (token) => {
  const decoded = jwt.verify(token, JWT_SECRET)
  return decoded
}

const authorizeBearerToken = (req, res, next) => {
  const splitRoot = req.path.split('/')
  splitRoot.shift()

  if (splitRoot[1] === 'auth') {
    return next()
  }

  if (!req.headers['authorization']) {
    return res.status(401).send('Access Denied. No token provided.')
  }

  const accessToken = req.headers['authorization'].split(' ')[1]

  try {
    const decoded = decodeToken(accessToken)
    req.user = decoded
    return next()
  } catch (error) {
    console.error(error)
    return res.status(400).send('Invalid Token.')
  }
}

const managerOrAdminAuthorization = (req, res, next) => {
  if (req.user.role === 'manager' || req.user.role === 'admin') {
    return next()
  } else {
    return res.status(401).send('Access denied. Unauthorized user.')
  }
}

/* const managerAuthorization = (req, res, next) => {
  if (req.user.role === "manager") {
    return next();
  } else {
    return res.status(401).send("Access denied. Unauthorized user.");
  }
}; */

const employeeAuthorization = (req, res, next) => {
  if (req.user.role === 'employee') {
    return next()
  } else {
    return res.status(401).send('Access denied. Unauthorized user.')
  }
}

module.exports = {
  authorizeBearerToken,
  signToken,
  decodeToken,
  managerOrAdminAuthorization,
  employeeAuthorization
}
