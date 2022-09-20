const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const applicationSchema = mongoose.Schema({
   fullname:{
        type:String,
        trim:true,
        required:[true, 'name is required'],
    },
   phone:{
        type:Number,
        trim:true,
        required:[true, 'phonenumber is required'],
    },
   email:{
        type: String,
        required:[true, 'Please provide your email'],
    },
    summary:{
        type:String,
        required:[true, 'Please provide CV summary']
    },
    jobtitle:{
        type:String,
        required:[true, 'Please provide job title']
    },
    jobid:{
        type:String,
        required:[true, 'Please provide jobid']
    },
    cv:{
        type:String,
    }
     
 
})


module.exports = mongoose.model('Application', applicationSchema)

