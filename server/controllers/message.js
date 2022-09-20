const Message = require('../models/Messages')
const { StatusCodes } = require('http-status-codes');
const {BadRequestError,  NotFoundError, CustomAPIError} = require('../errors')

const newmessage = async(req,res)=>{
    const {message,phonenumber,email} = req.body;
    if(!message ||!phonenumber ||!email ){
        throw new BadRequestError('Please provide the required fields')
    }
    const newmessage = await Message.create({message,phonenumber,email})
    res.status(StatusCodes.CREATED).json({success:true, newmessage})
}

//get specific message
const getmessage = async (req,res) =>{
    const {id:messageId} = req.params;
    const message = await Message.findById({_id:messageId});
    if(!message){
        throw new NotFoundError('Message does not exist')
    }
    res.status(200).json({success:true, message})
}

//get all applications
const getmessages = async (req,res) =>{
    const message = await Message.find({});
    res.status(200).json({success:true, message})
}

const deletemessage = async(req,res) =>{
    const {id:messageId} = req.params;
    const message = await Message.findByIdAndDelete({_id:messageId});
    res.status(200).json({success:true, message})
}



module.exports ={
newmessage,getmessage,getmessages,deletemessage}
