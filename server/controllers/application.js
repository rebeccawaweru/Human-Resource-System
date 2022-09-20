const Application = require('../models/Applications')
const { StatusCodes } = require('http-status-codes');
const {BadRequestError,  NotFoundError, CustomAPIError} = require('../errors')

const newapp = async(req,res)=>{
    const {fullname,phone,email,summary,jobtitle,jobid,cv} = req.body
    if(!fullname ||!phone ||!email || !summary || !jobtitle  || !jobid){
        throw new BadRequestError('Please provide the required fields')
    }
    const app = await Application.create({fullname,phone,email,summary,jobtitle,jobid,cv})
    res.status(StatusCodes.CREATED).json({success:true, app})
}

//get specific application
const getapp = async (req,res) =>{
    const {id:appId} = req.params;
    const app = await Application.findById({_id:appId});
    if(!app){
        throw new NotFoundError('Application does not exist')
    }
    res.status(200).json({success:true, app})
}

//get all applications
const getapps = async (req,res) =>{
    const app = await Application.find({});
    res.status(200).json({success:true, app})
}

const deleteapp = async(req,res) =>{
    const {id:appId} = req.params;
    const app = await Application.findByIdAndDelete({_id:appId});
    res.status(200).json({success:true, app})
}



module.exports ={
 newapp,getapp,getapps,deleteapp}





