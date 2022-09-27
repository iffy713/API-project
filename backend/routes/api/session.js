//this file will hold the resources for the route paths beginning with /api/session

const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

//Validating Login Request Body
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.post(
    '/',
    async (req, res, next) => {
      const { credential, password } = req.body;

      const user = await User.login({ credential, password });

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }

      await setTokenCookie(res, user);

      return res.json({
        user
      });
    }
  );

  router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  //Get Session User API Route
  router.get('/', restoreUser, (req, res)=>{
    const { user } = req;
    if(user){
        return res.json({ user: user.toSafeObject() })
    } else return res.json({})
  })

//Validating Login Request Body
const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
]
//Log in
router.post( '/', validateLogin, async (req, res, next)=>{
    const { credential, password } = req.body;
    const user = await User.login({ credential, password })

    if(!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err)
    }

    await setTokenCookie(res, user);

    return res.json({user})
} )



module.exports = router;
