const { Router } = require("express");
const router = Router();
const { registerUser, loginUser, verify } = require('../controllers/auth')
const validInfo = require("../middleware/validinfo");
const authorization = require('../middleware/authorization');

router.post("/register", validInfo, registerUser);
router.post("/login", validInfo, loginUser);

router.get("/verify", authorization, verify);

module.exports = router