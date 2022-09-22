const router = require('express').Router();
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



            router.post('/test', function(req,res){
                res.json({
                    requestBody: req.body
                })
            })



            router.use(restoreUser);
            module.exports = router;
