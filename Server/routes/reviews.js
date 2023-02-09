const express = require('express')
const {
  getAllReviews,
  createReview,
  getReview,
  deleteReview,
  updateReview,
} = require('../controllers/reviews')
const router = express.Router()

//router.route('/').post(createReview).get(getAllReviews)
//router.route('/:id').get(getReview).delete(deleteReview).patch(updateReview)
router.route('/').get(getAllReviews).post(createReview)
router.route('/:id').get(getReview).delete(deleteReview).patch(updateReview)
module.exports = router
