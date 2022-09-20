const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
   username:{
        type:String,
        trim:true,
        required:[true, 'name is required'],
    },
    phonenumber:{
        type:Number,
        trim:true,
        required:[true, 'phonenumber is required'],
    },
    email:{
        type: String,
        required:[true, 'Please provide your email'],
        unique:true,   
    },
    password:{
        type:String,
        required:[true, 'Please provide password'],
        minlength:6,
    },
    usertype:{
        type:String,
        required:[true, 'Please provide usertype'],
    },
    resetToken:{
       type:String, 
    },
    avatar:{
        type:String,
        default:"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg" 
    },
   expireToken:{
        type:String,
    },
    referralLink:{
        type:String,
    },
 
})

userSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
     return isMatch
}
module.exports = mongoose.model('User', userSchema)

