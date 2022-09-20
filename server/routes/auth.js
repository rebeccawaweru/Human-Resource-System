const express = require('express')
const router = express.Router()
const {newUser,deleteUser, login,getUser,findAddedUser ,getUsers,updateUser,resetpassword,newpassword} = require('../controllers/auth')

router.route('/signup').post(newUser);
router.route('/login').post(login);
router.route('/user/:id').get(getUser).patch(updateUser);
router.route('/users').get(getUsers);
router.route('/reset').post(resetpassword)
router.route('/newpassword').post(newpassword)
router.route('/addedusers').post(findAddedUser)
router.route('/deleteuser/:id').delete(deleteUser)
module.exports = router;
