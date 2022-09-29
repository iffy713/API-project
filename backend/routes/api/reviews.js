const express = require('express')

const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { requireAuth, restoreUser } = require('../../utils/auth')
const { Spot, User, Review, Booking, SpotImage, ReviewImage, sequelize } = require('../../db/models')

const router = express.Router()


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

//========Add an Image to a Review based on the Review's id==========
router.post('/:reviewId/images', requireAuth, async (req,res)=>{
    const review = await Review.findByPk(req.params.reviewId)
    if(!review){
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
          })
    }
    //maxium 10 images per image
    const images = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    })
    if(images.length > 10){
        return res.status(403).json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
          })
    }

    const newImage = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url: req.body.url
    })

    return res.status(200).json(newImage)
})

//==================Get all Reviews of the Current User==========
router.get('/current', requireAuth, async(req,res)=>{
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt','updatedAt','description']
                }
            },
            {
                model: ReviewImage
            }
        ]
    })
    //reviews => each review => spotId => if(spotId.hasImage) => datavalues.previewImage = SpotImages.url
    for(let review of reviews){
        let spot = await Spot.findByPk(review.spotId)
        let spotImageExits = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            }
        })
        if(spotImageExits){
            review.Spot.dataValues.previewImage = spotImageExits.url
        }
    }
    return res.status(200).json({Reviews: reviews})
})






module.exports = router
