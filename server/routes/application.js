const express = require('express')
const router = express.Router()
const { newapp,getapp,getapps,deleteapp } = require('../controllers/application')

router.route('/newapp').post(newapp);
router.route('/app/:id').get(getapp);
router.route('/apps').get(getapps);
router.route('/deleteapp/:id').delete(deleteapp)

module.exports = router;