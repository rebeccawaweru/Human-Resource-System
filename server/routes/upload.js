const express = require('express');
const router = express.Router();
const upload = require("../controllers/upload")



router.post('/uploads', upload)

module.exports = router