const express = require('express')
const router = express.Router()
const controller = require('../controllers/sensorController')

router.get('/', controller.render)

module.exports = router