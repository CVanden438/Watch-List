const express = require('express')
const { getAllTasks, createTask, deleteTask } = require('../controllers/tasks')
const router = express.Router()

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').delete(deleteTask)

module.exports = router
