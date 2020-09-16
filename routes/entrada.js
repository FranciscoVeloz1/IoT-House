const express = require('express')
const router = express.Router()
const controller = require('../controllers/entradaController')

router.get('/', controller.render)

module.exports = router