const express = require('express')

console.log('inside router')
const { root } = require('../controllers/root')
const { notFound } = require('../controllers/notfound')
const UserMoodController = require('../controllers/usermood-controller')

const router = express.Router()

// Routes
router.get('/', root)
router.get('/users', UserMoodController.getAllUsers)
router.get('/users/:userId', UserMoodController.getUserById)

router.post('/create', UserMoodController.CreateUser)
router.post('/createmood/:userId', UserMoodController.createMood)
router.get('/getUserMood/:userId/:mood',UserMoodController.getUserMood)


// Fall Through Route
router.use(notFound)

module.exports = router