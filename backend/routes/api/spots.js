const express = require('express')

const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { requireAuth, restoreUser } = require('../../utils/auth')
const { Spot, User, Review, ReviewImage, Booking, SpotImage,sequelize } = require('../../db/models')
const { Op } = require('sequelize')

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

const validateReview = [
  check('review')
    .exists({checkFalsy: true})
    .withMessage('Review text is required'),
  check('stars')
    .exists({checkFalsy: true})
    // .isIn([1,5])
    .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

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

const validateQuery  = [
  check("page")
    .optional()
    .isInt({min: 1, max: 10})
    .withMessage("Page must be greater than or equal to 1"),
  check("size")
    .optional()
    .isInt({min: 1, max: 20})
    .withMessage("Size must be greater than or equal to 1"),
  check("minLat")
    .optional()
    .isDecimal()
    .isInt({min: -90})
    .withMessage("Minimum latitude is invalid"),
  check("maxLat")
    .optional()
    .isDecimal()
    .withMessage("Maximum latitude is invalid"),
  check("minLng")
    .optional()
    .isDecimal()
    .withMessage("Minimum longitude is invalid"),
  check("maxLng")
    .optional()
    .isDecimal()
    .withMessage("Maxium longitude is invalid"),
  check("minPrice")
    .optional()
    .isDecimal({min:0})
    .withMessage("Minimum price must be greater than or equal to 0"),
  check("maxPrice")
    .optional()
    .isDecimal({min:0})
    .withMessage("Maxium price must be greater than or equal to 0"),
  handleValidationErrors
]
//===================Get all Spots===========================
router.get('/',validateQuery, async(req,res)=>{

  let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query

    if(!size) size = 20
    if(!page) page = 1

    size = parseInt(size)
    page = parseInt(page)

    let pagination = {}

    if(page >0 && size > 0){
      pagination.offset = size * (page-1)
      pagination.limit = size
    }

    let filter = []

    if(minLat)  filter.push( { lat: {[Op.gte] : Number(minLat) }} )

    if(maxLat) filter.push( { lat: {[Op.lte]: Number(maxLat) } })

    if(minLng) filter.push( { lng: {[Op.gte]: Number(minLng) } })

    if(maxLng) filter.push( { lng: {[Op.lte] : Number(maxLat) }} )

    if(minPrice) filter.push( { price: {[Op.gte] : Number(minPrice)}} )

    if(maxPrice) filter.push( { price: {[Op.lte] : Number(maxPrice)}} )

    const spots = await Spot.findAll({
      where: {
        [Op.and]: [
          ...filter
        ]
      },
      ...pagination
    })
    for(let spot of spots ){
        //avgRating added
        const spotReview = await spot.getReviews({
            attributes: [
                [
                    sequelize.fn('AVG', sequelize.col("stars")), "avgRating"
                ]
            ]
        })
        // console.log(spotReview[0])
        let avgRating = spotReview[0].dataValues.avgRating
        // console.log(avgRating)


        spot.dataValues.avgRating = parseFloat(Number(avgRating).toFixed(1)) //passed in local


        //previewImage added
        const spotImage = await SpotImage.findByPk(spot.id)
        if(spotImage){
          spot.dataValues.previewImage = spotImage.url
        } else {
          spot.dataValues.previewImage = ""
        }

    }
    return res.json({Spots: spots, page, size})
})

//==================Create a spot=========================
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
    return res.status(201).json(newSpot)
})


//=============Add an Image to a Spot based on the Spot's id=============
router.post('/:spotId/images', requireAuth,restoreUser, async (req, res)=>{
  const spot = await Spot.findByPk(req.params.spotId)

  if(!spot){
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  //verify the spot belongs to owner
  if(spot.ownerId !== req.user.id){
    return res.status(403).json({ "message": "Forbidden", "statusCode": 403 })
  }

  const { url, preview } = req.body
  //add image into SpotImages
  const newImage = await SpotImage.create({
    spotId: req.params.spotId,
    url,
    preview
  })

  return res.status(200).json({
    id: newImage.id,
    url,
    preview: true
  })
})


//==================Get all Spots owned by the Current User===============
router.get('/current', requireAuth, async (req, res)=>{
  const spots = await Spot.findAll({
    where: {
      ownerId: req.user.id
    }
  })
  for(let spot of spots){
    //-------------------Get average stars----------------------//
    const spotReview = await spot.getReviews({
      attributes: [
          [
              sequelize.fn('AVG', sequelize.col("stars")), "avgRating"
          ]
      ]
    })
    let avgRating = spotReview[0].dataValues.avgRating
    spot.dataValues.avgRating = parseFloat(Number(avgRating).toFixed(1))
  //-------------------Get average stars----------------------//

    const spotImage = await SpotImage.findByPk(spot.id)
    if(spotImage){
      spot.dataValues.previewImage = spotImage.url
    } else {
      spot.dataValues.previewImage = ""
    }
  }
  return res.json({Spots: spots})
})

//=========================Get details of a Spot from an id===========
router.get('/:spotId', async(req, res)=>{
  const spot = await Spot.findOne({
    where: {
      id: req.params.spotId
    },
    include: [
      { model: SpotImage,
      attributes: ['id','url','preview']
      },
      {
        model: User,
        attributes: ['id','firstName','lastName'],
        as: "Owner"
      }
    ]
  })
  if(!spot){
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  //avgStarRating
  const spotReview = await spot.getReviews({
    attributes: [
        [
            sequelize.fn('AVG', sequelize.col("stars")), "avgRating"
        ]
    ]
  })
  let avgRating = spotReview[0].dataValues.avgRating
  spot.dataValues.avgStarRating = parseFloat(Number(avgRating).toFixed(1))
  //numReviews
  const reviewsCount = await Review.count({
    where: {
      spotId: req.params.spotId
    }
  })
  spot.dataValues.avgStarRating = reviewsCount
  spot.dataValues.numReviews = reviewsCount

  return res.json(spot)
})

//Error Response: Body validation error (400)
//========================Edit a Spot=====================
router.put('/:spotId', requireAuth,validateSpot, async(req, res)=>{
  const { address, city, state, country, lat, lng, name, description, price } = req.body
  const spot = await Spot.findByPk(req.params.spotId)
  if(!spot){
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  } else {
    if(address){
      spot.address = address
    }
    if(city){
      spot.city = city
    }
    if(state){
      spot.state = state
    }
    if(country){
      spot.country = country
    }
    if(lat){
      spot.lat = lat
    }
    if(lng){
      spot.lng = lng
    }
    if(name){
      spot.name = name
    }
    if(description) {
      spot.description = description
    }
    if(price) {
      spot.price = price
    }
    spot.save()
    res.json(spot)
  }
})

//=======================Delete a Spot================
router.delete('/:spotId', requireAuth, restoreUser, async(req, res)=>{
  const spot = await Spot.findByPk(req.params.spotId)
  if(!spot){
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  await spot.destroy()
  return res.json({
    "message": "Successfully deleted",
    "statusCode": 200
  })
})

//===========Create a Review for a Spot based on the Spot's id===========
router.post('/:spotId/reviews', requireAuth,validateReview, async(req, res)=>{
  const { review, stars } = req.body
  const spot = await Spot.findByPk(req.params.spotId)
  if(!spot) {
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  const reviewExits = await Review.findOne({
    where: {
      userId: req.user.id,
      spotId: spot.id
    }
  })
  if(reviewExits){
    return res.status(403).json({
      "message": "User already has a review for this spot",
      "statusCode": 403
    })
  }
  const newReview = await Review.create({
    userId: req.user.id,
    spotId: spot.id,
    review,
    stars
  })

  return res.status(201).json(newReview)
})


//===============Get all Reviews by a Spot's id=================
router.get('/:spotId/reviews', async (req,res)=>{
  //spotId => reviews.spotId
  const spot = await Spot.findByPk(req.params.spotId)
  if(!spot){
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  const reviews = await Review.findAll({
    where: {
      spotId: spot.id
    },
    include: [{
      model: User,
      attributes: ['id','firstName','lastName']
    },
    {
      model: ReviewImage,
      attributes: ['id','url']
    }]
  })
  return res.json({Reviews: reviews})

})

//*need to check exist booking
//====================Create a Booking from a Spot based on the Spot's id==========
router.post('/:spotId/bookings', requireAuth, validateBooking ,async (req,res)=> {
  const spot = await Spot.findByPk(req.params.spotId)
  //------Couldn't find a Spot with the specified id
  if(!spot){
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }

  if(req.body.endDate <= req.body.startDate) {
    return res.status(400).json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "endDate": "endDate cannot be on or before startDate"
      }
    })
  }
  const bookings = await Booking.findAll({
    where: {
      spotId: req.params.spotId,
    }
  })
  const { startDate, endDate } = req.body
  for (let booking of bookings){
    if ( booking.dataValues.startDate <= new Date(startDate) && booking.dataValues.endDate >= new Date(startDate) ){
      return res.status(403).json({
        "message": "Sorry, this spot is already booked for the specified dates",
        "statusCode": 403,
        "errors": {
          "endDate": "End date conflicts with an existing booking"
        }
      })
    } else if ( booking.dataValues.endDate >= new Date(endDate) && booking.dataValues.startDate <= new Date(endDate) ){
      return res.status(403).json({
        "message": "Sorry, this spot is already booked for the specified dates",
        "statusCode": 403,
        "errors": {
          "startDate": "Start date conflicts with an existing booking",
        }
      })
    }
  }
  const newBooking = await Booking.create({
    spotId: req.params.spotId,
    userId: req.user.id,
    startDate,
    endDate,
  })
  return res.status(200).json(newBooking)

})

//===================Get all Bookings for a Spot based on the Spot's id=============
router.get('/:spotId/bookings', requireAuth, async(req, res)=>{
  const bookings = await Booking.findAll({
    where: {
      spotId: req.params.spotId
    }
  })
  if(!bookings.length){
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  if(req.user.id !== Spot.ownerId){
    const bookingsForUser = await Booking.findAll({
      where: {
        spotId: req.params.spotId
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt','id','userId']
      }
    })
    return res.status(200).json({Booking: bookingsForUser})
  } else {
    const bookingsForOwner = await Booking.findAll({
      where: {
        spotId: req.params.spotId
      },
      include: [{
        model: User,
        attributes: ['id','firstName','lastName']
      }]
    })
    return res.status(200).json({Bookings: bookingsForOwner})
  }

})


module.exports = router
