const express = require('express')
const router = express.Router()
const controller = require('../controllers/api')

router.get('/', controller.getLevels)
router.get('/leaderboard/:id', controller.getLeaderboard)
router.post('/leaderboard/:id', controller.addToLeaderBoard)
router.get('/:id', controller.getLevel)

module.exports = router