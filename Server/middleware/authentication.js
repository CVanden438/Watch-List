const User = require('../models/User')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    return res.status(401).json({ message: 'Error' })
  }
  const token = authHeader.split(' ')[1]

  try {
    const payload = jwt.verify(token, 'test')
    req.user = { userId: payload.userId, name: payload.name }
    next()
  } catch (error) {
    console.log('Error')
  }
}

module.exports = auth
