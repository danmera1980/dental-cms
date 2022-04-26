const { Router } = require("express");
const router = Router();
const authorization = require('../middleware/authorization');
const { dashboard } = require('../controllers/dashboard')

router.get("/", authorization, dashboard)


module.exports = router