const express = require('express')
const router = express.Router()
const controller = require('../controllers/hpController')

router.get('/', controller.render)

module.exports = router