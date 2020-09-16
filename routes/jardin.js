const express = require('express')
const router = express.Router()
const controller = require('../controllers/jardinController')

router.get('/', controller.render)

module.exports = router