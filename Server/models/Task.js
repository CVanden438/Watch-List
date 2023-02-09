const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema(
  {
    info: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    daily: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    day: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
)

const Task = mongoose.model('Task', TaskSchema)

module.exports = Task
