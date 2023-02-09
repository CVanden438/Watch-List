const express = require('express')
const router = express.Router()
const { register, login, getCurrentUser } = require('../controllers/auth')
const authenticateUser = require('../middleware/authentication')

router.post('/register', register)
router.post('/login', login)
router.get('/getCurrentUser', authenticateUser, getCurrentUser)
module.exports = router
