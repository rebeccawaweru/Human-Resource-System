const User = require('../models/User')
const { StatusCodes } = require('http-status-codes');
const {BadRequestError, UnauthenticatedError, NotFoundError, CustomAPIError} = require('../errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const crypto = require("crypto")
const sendgridTransport = require('nodemailer-sendgrid-transport');
const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:process.env.SENDGRID_API_KEY
    }
}))
const newUser = async(req,res)=>{
    const {username,email,phonenumber,password,usertype} = req.body
    if(!username || !email || !phonenumber || !password){
        throw new BadRequestError('Please provide the required credentials')
    }
    const finduser = await User.findOne({email})
    if(finduser){
        throw new UnauthenticatedError('User Already Exists')
    }
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password,salt)
    const user = await User.create({username,email,phonenumber,password:hashedpassword,usertype})
    res.status(StatusCodes.CREATED).json({success:true, user})
}
const login = async(req,res)=>{
    const {email,password} = req.body;
    if( !email || !password){
        throw new BadRequestError('Please provide the required credentials')
    }
    const user = await User.findOne({email})
    if(!user){
        throw new UnauthenticatedError('User does not exist')
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Incorrect credentials')
    }
    const id = user._id
    const username = user.username
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
    })
    res.status(200).json({success:true, token, id:user._id})
}
//get specific user
const getUser = async (req,res) =>{
    const {id:userId} = req.params;
    const user = await User.findById({_id:userId});
    if(!user){
        throw new NotFoundError('User does not exist')
    }
    res.status(200).json({user})
}

//getUsers
const getUsers = async (req,res) =>{
    const users = await User.find({});
    res.status(200).json({users})
}
const updateUser = async(req,res)=>{
    const {id:userId} = req.params
    const user = await User.findByIdAndUpdate({_id:userId},req.body,{
     new:true,
     runValidators:true,
 })
    if(!user){
        throw new CustomAPIError('No user to update')
    }
    res.status(200).json({success:true, user})
}

const resetpassword = async (req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
             res.status(500).json('No user exists with that email')
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000;
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"forexarenakenya@gmail.com",
                    subject:"Password reset",
                    html:
                    `<p>You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:3000?token=${token}">Link</a> to reset your password</h5>`
                })
                res.status(200).json({message:"check your email"})
            })
        })
    })
}

 //forgot password change
    const newpassword = (req,res) =>{ 
        const {password,sentToken} = req.body;
        User.findOne({resetToken:sentToken, expireToken:{$gt:Date.now()}})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"Try again session expired"})
            }
            bcrypt.hash(password,10).then(hashedpassword=>{
              user.password= hashedpassword;
              user.resetToken = undefined;
              user.expireToken = undefined;
              user.save().then(user=>{
                res.json('Password set')
              })
              .catch(err=>res.status(400).json('Error' +err));
            })
             .catch(err=>res.status (404).json('Error' +err));
    })}

    
const findAddedUser = async(req,res)=>{
    const {usertype} = req.body;
    const users = await User.find({usertype:usertype})
    if(!users){
        res.status(500).json('No added users')
    }
    res.status(200).json({success:true, users})
}

const deleteUser = async(req,res)=>{
    const {id:userId} = req.params
    const user = await User.findByIdAndDelete({_id:userId})
    if(!user){
        res.status(500).json('error')
    }
    res.status(200).json({success:true, user})
}



module.exports ={
    deleteUser,
    updateUser,
    newUser,
    login,
    getUser,
    getUsers,
    resetpassword,
    newpassword,
    findAddedUser 
}





