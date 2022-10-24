const express = require('express')

const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { requireAuth, restoreUser } = require('../../utils/auth')
const { Spot, User, Review, Booking, SpotImage, ReviewImage, sequelize } = require('../../db/models')

const router = express.Router()


const validateBooking = [
    check('startDate')
      .exists({checkFalsy: true})
      .withMessage("Start date conflicts with an existing booking")
      .isDate()
      .withMessage("Please enter a date."),
      // .isAfter(),
    check('endDate')
      .exists({checkFalsy: true})
      .isAfter(this.startDate)
      .withMessage("End date conflicts with an existing booking")
      .isDate()
      .withMessage("Please enter a date."),
      handleValidationErrors
  ]

//====================Get all of the Current User's Bookings========
router.get('/current', requireAuth, async(req, res)=>{
    // //console.log('===============')
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id,
        },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['description','createdAt','updatedAt']
                }
            }
        ]
    })
    //
    for(let booking of bookings){
        let spot = await Spot.findByPk(booking.spotId)
        let spotImageExits = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            }
        })
        if(spotImageExits){
            booking.Spot.dataValues.previewImage = spotImageExits.url
        } else {
            booking.Spot.dataValues.previewImage = ""
        }
    }
    return res.status(200).json({Bookings: bookings})
})

// !!!!! test didn't passed
// ===============Update and return an existing booking.========
router.put('/:bookingId', requireAuth, validateBooking,async (req, res)=>{
    const { starDate, endDate } = req.body
    const oldBooking = await Booking.findByPk(req.params.bookingId)


    if(!oldBooking){
        return res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    } else {
        if(starDate){
            oldBooking.starDate = starDate
        }
        if(endDate) {
            oldBooking.endDate = endDate
        }
        oldBooking.save()
        return res.json(oldBooking)
    }
})

//=====================Delete a Booking======================
router.delete('/:bookingId', requireAuth, async(req, res)=>{
    const booking = await Booking.findByPk(req.params.bookingId)
    if(!booking){
        return res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
    }
    const today = new Date()
    if(booking.starDate > today){
        return res.status(403).json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
          })
    }
    booking.destroy()
    return res.status(200).json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
})


module.exports = router
