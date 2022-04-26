/** @format */

const { Router } = require('express');
const userRoute = require('./routerUser');
const jwAuth = require('./jwAuth')

const router = Router();

router.use('/auth', jwAuth)
router.use('/users', userRoute);


module.exports = router;