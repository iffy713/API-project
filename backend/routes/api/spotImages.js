const express = require('express')

const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { requireAuth, restoreUser } = require('../../utils/auth')
const { Spot, User, Review, Booking, SpotImage, ReviewImage, sequelize } = require('../../db/models')

const router = express.Router()

//===============Delete a Spot Image==================
router.delete('/:imageId', requireAuth, async(req, res)=>{
    const image = await SpotImage.findByPk(req.params.imageId)
    if(!image){
        return res.status(404).json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
          })
    }
    image.destroy()
    return res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})


module.exports = router
