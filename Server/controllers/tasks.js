const Task = require('../models/Task')
const { StatusCodes } = require('http-status-codes')
const asyncWrapper = require('../middleware/asyncWrapper')

const createTask = asyncWrapper(async (req, res) => {
  req.body.createdBy = req.user.userId
  const task = await Task.create(req.body)
  res.status(StatusCodes.OK).json({ task })
})

const deleteTask = asyncWrapper(async (req, res) => {
  const {
    user: { userId },
    params: { id: taskId },
  } = req
  const task = await Task.findByIdAndDelete({
    _id: taskId,
    createdBy: userId,
  })
  if (!task) {
    throw new NotFoundError('No task!')
  }
  res.status(StatusCodes.OK).send()
})

const getAllTasks = asyncWrapper(async (req, res) => {
  const { filter } = req.query
  const queryOject = {
    createdBy: req.user.userId,
  }
  const tasks = await Task.find({ ...queryOject }).sort('createdAt')
  res.status(StatusCodes.OK).json({ tasks, count: tasks.length })
})

module.exports = {
  createTask,
  deleteTask,
  getAllTasks,
}
// exports.getTasks = async (req, res) => {
//   try {
//     const query = {}

//     // Filter tasks by "completed" and "daily" fields
//     if (req.query.completed) {
//       query.completed = req.query.completed === 'true'
//     }
//     if (req.query.daily) {
//       query.daily = req.query.daily === 'true'
//     }

//     // Sort tasks by "day" field
//     let sort = {}
//     if (req.query.sortBy) {
//       const parts = req.query.sortBy.split(':')
//       sort[parts[0]] = parts[1] === 'asc' ? 1 : -1
//     }

//     // Query the database and return the results
//     const tasks = await Task.find(query).sort(sort)
//     res.json(tasks)
//   } catch (error) {
//     res.status(500).json({ error: error.message })
//   }
// }
