const express = require('express')
const { createStock } = require('../controllers/stock.controller')

const router = express.Router()


router.route('/')
    .post(createStock)
    .get()
  


module.exports = router


