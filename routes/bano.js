const express = require('express')
const router = express.Router()
const controller = require('../controllers/banoController')

router.get('/', controller.render)

module.exports = router