/** @format */

const { Router } = require('express');
const userRoute = require('./routerUser');
const jwAuth = require('./jwAuth');
const dashboard = require('./dashboard')

const router = Router();

router.use('/auth', jwAuth);
router.use('/dashboard', dashboard)
router.use('/users', userRoute);


module.exports = router;