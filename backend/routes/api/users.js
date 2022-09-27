//this file will hold the resources for the route paths beginning with /api/users
const express = require('express');

//User Signup API Route
const { setTokenCookie, requireAuth } = require('../../utils/auth')
const { User } = require('../../db/models')

//Validating Signup Request Body
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation')

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('firstName')
      .exists({checkFalsy: true})
      .withMessage('Please provide your first name.'),
    check('firstName')
      .not()
      .isEmail()
      .withMessage('First name cannot be an email.'),
    check('lastName')
      .exists({checkFalsy: true})
      .withMessage('Please provide your last name.'),
    check('lastName')
      .not()
      .isEmail()
      .withMessage('Last name cannot be an email.'),
    handleValidationErrors
  ];

// Sign up
router.post('/', validateSignup, async (req, res) => {

  const { email, password, username, firstName, lastName } = req.body;

    let user = await User.signup({ email, username, password, firstName, lastName });


    //Error response with status 400 is given when body validations for the email, firstName, or lastName are violated
    // const emailExits = await User.findOne({where: email})

    let getToken = await setTokenCookie(res, user)
    user = user.toJSON()
    user.token = getToken

    return res.json({
      user,
    });
  }
);





module.exports = router;
