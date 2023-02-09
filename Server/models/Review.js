const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, 'Please provide a description'],
      maxlength: 1000,
    },
    rating: {
      type: Number,
      enum: [0, 1, 2, 3, 4, 5],
      default: 0,
    },
    mediaType: {
      type: String,
      required: [true, 'Please provide a type'],
      enum: ['Film', 'Show', 'Anime'],
    },
    watched: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Review', ReviewSchema)
