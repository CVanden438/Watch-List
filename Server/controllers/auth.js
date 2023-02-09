const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const asyncWrapper = require('../middleware/asyncWrapper')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = asyncWrapper(async (req, res) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.firstname }, token })
})

const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Please provide email and password')
  }
  const user = await User.findOne({ email })
  if (!user) {
    throw new UnauthenticatedError('Invalid credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid credentials')
  }
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.firstname }, token })
})

const getCurrentUser = asyncWrapper(async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
  res.status(StatusCodes.OK).json({ user: { name: user.firstname } })
})
module.exports = { register, login, getCurrentUser }
