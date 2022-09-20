const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
   message:{
        type:String,
        required:[true, 'message is required'],
    },
    phonenumber:{
        type:Number,
        required:[true, 'phonenumber is required'],
    },
    email:{
        type: String,
        required:[true, 'Please provide your email'], 
    },
 
 
})


module.exports = mongoose.model('Message', messageSchema)

