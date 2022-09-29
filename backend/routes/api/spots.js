const express = require('express')

const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { requireAuth, restoreUser } = require('../../utils/auth')
const { Spot, User, Review, Booking, SpotImage,sequelize } = require('../../db/models')
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

//===================Get all Spots===========================
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
        // console.log(spotReview[0])
        let avgRating = spotReview[0].dataValues.avgRating
        // console.log(avgRating)


        spot.dataValues.avgRating = parseFloat(Number(avgRating).toFixed(1)) //passed in local


        //previewImage added
        const spotImage = await SpotImage.findByPk(spot.id)
        if(spotImage){
          spot.dataValues.previewImage = spotImage.url
        }

    }
    return res.json({Spots: spots})
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


// *need to verify the spot belongs to owner
//=============Add an Image to a Spot based on the Spot's id=============
router.post('/:spotId/images', requireAuth,restoreUser, async (req, res)=>{
  const spot = await Spot.findByPk(req.params.spotId)
  if(!spot){
    return res.status(404).json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
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
    spot.dataValues.avgRating = Number(avgRating).toFixed(1)
  //-------------------Get average stars----------------------//

    const spotImage = await SpotImage.findByPk(spot.id)
    if(spotImage){
      spot.dataValues.previewImage = spotImage.url
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
  spot.dataValues.avgStarRating = Number(avgRating).toFixed(1)
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


module.exports = router
