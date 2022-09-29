const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots')
const reviewsRouter = require('./reviews')
//add routers
// const bookingsRouter = require('./bookings')
// const reviewImagesRouter = require('./reviewImages')
// const spotImagesRouter = require('./spotImages')
const { restoreUser } = require('../../utils/auth.js');


// //Test User Auth Middlewares
// // GET /api/set-token-cookie
// const { setTokenCookie } = require('../../utils/auth.js');
// const { User } = require('../../db/models');
// router.get('/set-token-cookie', async (_req, res) => {
//   const user = await User.findOne({
//       where: {
//         username: 'Demo-lition'
//       }
//     });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });



// //Test User Auth Middlewares
// // GET /api/restore-user


// // GET /api/require-auth
// const { requireAuth } = require('../../utils/auth.js');
// router.get(
    //   '/require-auth',
    //   requireAuth,
//   (req, res) => {
    //     return res.json(req.user);
    //   }
    // );
    // router.get(
        //   '/restore-user',
        //   (req, res) => {
            //     return res.json(req.user);
            //   }
            // );




router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/spots', spotsRouter);

router.use('/reviews', reviewsRouter)


router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;
