const express = require('express');
const router = express.Router();
const {ipay,callback,ipay2} = require('../controllers/ipay')

router.post('/ipay-api', ipay)

module.exports = router
