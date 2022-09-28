const express = require('express')

const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { requireAuth } = require('../../utils/auth')
const { Spot, Review, Booking, SpotImage,sequelize } = require('../../db/models')
const user = require('../../db/models/user')


const router = express.Router()

const validateSpot = [
    check('address')
      .exists({checkFalsy: true})
      .withMessage('Street address is required'),
    check('city')
      .exists({checkFalsy: true})
      .withMessage('City is required'),
    check('state')
      .exists({checkFalsy: true})
      .withMessage('State is required'),
    check('country')
      .exists({checkFalsy: true})
      .withMessage('Country is required'),
    check('lat')
      .exists({checkFalsy: true})
      .withMessage('Latitude is not valid'),
    check('lng')
      .exists({checkFalsy: true})
      .withMessage('Longitude is not valid'),
    check('name')
      .exists({checkFalsy: true})
      .isLength({max:50})
      .withMessage('Name must be less than 50 characters'),
    check('description')
      .exists({checkFalsy: true})
      .withMessage('Description is required'),
    check('price')
      .exists({checkFalsy: true})
      .withMessage('Pirce per day is required'),
    handleValidationErrors
]

router.get('/', async(req,res)=>{
//Get all Spots with avgRating & previewImage
    const spots = await Spot.findAll()
    for(let spot of spots ){
        //avgRating added
        const spotReview = await spot.getReviews({
            attributes: [
                [
                    sequelize.fn('AVG', sequelize.col("stars")), "avgRating"
                ]
            ]
        })
        console.log(spotReview[0])
        let avgRating = spotReview[0].dataValues.avgRating
        spot.dataValues.avgRating = Number(avgRating).toFixed(1)

        //previewImage added
        const spotImage = await SpotImage.findByPk(spot.id)
        spot.dataValues.previewImage = spotImage.url
    }
    return res.json(spots)
})

router.post('/',  validateSpot, requireAuth, async(req,res)=>{
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    return res.json(newSpot)
})

module.exports = router
