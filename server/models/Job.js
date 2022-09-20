const mongoose = require('mongoose')
const jobSchema = mongoose.Schema({
    username:{
      type:String,
      required:[true, 'Please provide username of poster']
    },
    email:{
      type:String,
      required:[true, 'Please provide email of poster']
    },
    phonenumber:{
        type:Number,
        required:[true, 'Please provide phone number']
    },
   photo:{
        type:String,
        trim:true,
        required:[true, 'photo is required'],
    },
    jobtitle:{
        type: String,
        required:[true, 'Please provide your job title'],
        unique:true,   
    },
    category:{
        type:String,
        required:[true, 'Please provide category'],
    },
    jobtype:{
        type:String,
        required:[true, 'Please provide usertype'],
    },
    experience:{
        type:String, 
        required:[true, 'Please provide experience'],
    },
   country:{
        type:String, 
        required:[true, 'Please provide country'],
    },
    city:{
        type:String, 
        required:[true, 'Please provide city'],
    },
    description:{
        type:String, 
        required:[true, 'Please provide description'],
     },
    startdate:{
        type:String,
    },
    endate:{
        type:String,
    },
    salary:{
       type:String, 
    },
    website:{
        type:String, 
     },
    address:{
        type:String, 
     },
})


module.exports = mongoose.model('Job', jobSchema)

