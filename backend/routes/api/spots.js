const express = require('express')

const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { Spot, Review, Booking } = require('../../db/models')

const router = express.Router()

router.get('/', async(req,res)=>{
    res.send('success')
})

module.exports = router
