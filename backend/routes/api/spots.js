const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth')
const { Spot, User, SpotImage, Review } =  require('../../db/models')

const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/auth')
const {Spot} = require('../../db/models/spot')


const router = express.Router()

const validateSpot = [
    check('')
]

router.get('/', async (req, res)=> {

    // let spots = []
    // let obj
    // let avgRating

    // for( let spot of spots ){
    //     obj = spot.toJSON()

    //     avgRating = await Review.findAll({
    //         attributes: [
    //             [
    //                 sequelize.fn('AVG',sequelize.col('Revies.stars')),
    //                 'avgRating'
    //             ]
    //         ],
    //         raw: true,
    //         where: { spotId: spot.id }
    //     })

    // }

    const spots = await Spot.findAll()

    res.json({spots})
})







module.exports = router;
