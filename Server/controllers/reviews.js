const Review = require('../models/Review')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')
const asyncWrapper = require('../middleware/asyncWrapper')

const getAllReviews = asyncWrapper(async (req, res) => {
  const { filter } = req.query
  const queryOject = {
    createdBy: req.user.userId,
  }
  if (filter && filter !== 'All') {
    queryOject.mediaType = filter
  }
  const reviews = await Review.find({ ...queryOject }).sort('createdAt')
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length })
})

const createReview = asyncWrapper(async (req, res) => {
  req.body.createdBy = req.user.userId
  const review = await Review.create(req.body)
  res.status(StatusCodes.CREATED).json({ review })
})

const getReview = asyncWrapper(async (req, res) => {
  const {
    user: { userId },
    params: { id: reviewId },
  } = req
  const review = await Review.findOne({ _id: reviewId, createdBy: userId })
  if (!review) {
    throw new NotFoundError('No review!')
  }
  res.status(StatusCodes.OK).json({ review })
})

const deleteReview = asyncWrapper(async (req, res) => {
  const {
    user: { userId },
    params: { id: reviewId },
  } = req
  const review = await Review.findByIdAndDelete({
    _id: reviewId,
    createdBy: userId,
  })
  if (!review) {
    throw new NotFoundError('No review!')
  }
  res.status(StatusCodes.OK).send()
})

const updateReview = asyncWrapper(async (req, res) => {
  const {
    body: { title, description, rating },
    user: { userId },
    params: { id: reviewId },
  } = req
  if (title === '' || description === '') {
    throw new BadRequestError('Title and Description must be filled')
  }
  const review = await Review.findByIdAndUpdate(
    { _id: reviewId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!review) {
    throw new NotFoundError('No review!')
  }
  res.status(StatusCodes.OK).json({ review })
})

module.exports = {
  getAllReviews,
  createReview,
  getReview,
  deleteReview,
  updateReview,
}
