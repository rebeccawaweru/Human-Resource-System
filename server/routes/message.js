const express = require('express')
const router = express.Router()
const {newmessage,getmessage,getmessages,deletemessage} = require('../controllers/message')

router.route('/newmessage').post(newmessage);
router.route('/message/:id').get(getmessage);
router.route('/messages').get(getmessages);
router.route('/deletemessage/:id').delete(deletemessage)

module.exports = router;