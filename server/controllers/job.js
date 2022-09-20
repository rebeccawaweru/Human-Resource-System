const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes');
const {BadRequestError,  NotFoundError, CustomAPIError} = require('../errors')

const newJob = async(req,res)=>{
    const {username,email,phonenumber,photo,jobtitle,category,jobtype,experience,country,city,description,startdate,endate,salary,website,address} = req.body
    if(!photo || !jobtitle || !category || !jobtype || !experience || !country || !city || !description){
        throw new BadRequestError('Please provide the required fields')
    }
    const job = await Job.create({username,email,phonenumber,photo,jobtitle,category,jobtype,experience,country,city,description,startdate,endate,salary,website,address})
    res.status(StatusCodes.CREATED).json({success:true, job})
}

//get specific job
const getJob = async (req,res) =>{
    const {id:jobId} = req.params;
    const job = await Job.findById({_id:jobId});
    if(!job){
        throw new NotFoundError('Job does not exist')
    }
    res.status(200).json({success:true, job})
}

//getAllJobs
const getJobs = async (req,res) =>{
    const job = await Job.find({});
    res.status(200).json({success:true, job})
}
//updateJob
const updateJob = async(req,res)=>{
    const {id:jobId} = req.params
    const job = await Job.findByIdAndUpdate({_id:jobId},req.body,{
     new:true,
     runValidators:true,
 })
    if(!job){
        throw new CustomAPIError('No job to update')
    }
    res.status(200).json({success:true, job})
}

//delete job
const deleteJob = async(req,res)=>{
    const {id:jobId} = req.params
    const job = await Job.findByIdAndDelete({_id:jobId})
    if(!job){
        res.status(500).json('error')
    }
    res.status(200).json({success:true, job})
}

//findjob poster
const findJob = async(req,res)=>{
    const {email} = req.body;
    const job = await Job.find({email:email})
    if(!job){
        res.status(404).json('No job posted')
    }
    res.status(200).json({success:true , job})
}



module.exports ={
    findJob,
    newJob,
    getJob,
    getJobs,
    updateJob,
    deleteJob,

}





