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
      .withMessage('Invalid email'),
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
      .withMessage('First Name is required'),
    check('firstName')
      .not()
      .isEmail()
      .withMessage('First name cannot be an email.'),
    check('lastName')
      .exists({checkFalsy: true})
      .withMessage('Last Name is required'),
    check('lastName')
      .not()
      .isEmail()
      .withMessage('Last name cannot be an email.'),
    handleValidationErrors
  ];


// Sign up
router.post('/', validateSignup, async (req, res) => {

    const { firstName,lastName,email,username,password } = req.body

    //Error response with status 400 is given when body validations for the email, firstName, or lastName are violated
    const emailExits = await User.findOne({where:{email}})
    if(emailExits){
      res.status(403)
      return res.json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "email": "User with that email already exists"
        }
      })
    }

    const usernameExits = await User.findOne({where: {username}})
    if(usernameExits){
      res.status(403)
      return res.json({
        "message": "User already exists",
        "statusCode": 403,
        "errors": {
          "username": "User with that username already exists"
        }
      })
    }

    let user = await User.signup({ firstName, lastName, username, email, password });
    let getToken = await setTokenCookie(res, user)
    user = user.toJSON()
    user.token = getToken

    return res.json(user);
  }
);





module.exports = router;
