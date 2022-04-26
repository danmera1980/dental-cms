const { Router } = require("express");
const { getAllUsers } = require('../controllers/users')
const router = Router();

router.get("/", getAllUsers);

module.exports = router;