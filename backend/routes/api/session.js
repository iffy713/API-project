//this file will hold the resources for the route paths beginning with /api/session

const express = require('express');

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

//Validating Login Request Body
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//Validating Login Request Body
const validateLogin = [
      check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Email or username is required'),
      check('password')
      .exists({ checkFalsy: true })
      .withMessage('Password is required'),
      handleValidationErrors
    ]
    //Log in
    router.post( '/', validateLogin, async (req, res, next)=>{
      const { credential, password } = req.body;
      const user = await User.login({ credential, password })

      if(!user) {
        res.status(401)
        return res.json({
          "message": "Invalid credentials",
          "statusCode": 401
        })
      }

      let getToken = await setTokenCookie(res,user)
      let output = user.toJSON()
      output.token = getToken

      return res.json(output)
    } )

    //Get Session User API Route
    router.get('/', restoreUser, (req, res)=>{
      const { user } = req;
      if(user){
          // return res.json({ user: user.toSafeObject() })
          return res.json(user)
        } else return res.json({})
      })

    //log out
    router.delete(
      '/',
      (_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
      }
    );


    module.exports = router;
