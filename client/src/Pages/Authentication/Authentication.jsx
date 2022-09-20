import React,{useState,useEffect} from 'react';
import {useSearchParams,useNavigate} from 'react-router-dom'
import {Box,Typography,Button,Modal,IconButton, Stack} from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { CustomInput } from '../../Components';
import {Formik} from 'formik'
import * as  Yup from 'yup'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import client from '../../api/client';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width:{
    lg:400,
    md:400,
    xs:300,
    sm:300
  },
  height:{
    lg:498,
    md:498,
    sm:525,
    xs:525
  },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderTop:"5px solid #0d6efd",
  boxShadow: 24,
  p: 6,
  overflow: 'scroll'
};
const regx = /^\d{10}$/;
export default function Signup({open,handleClose}) {
    const [login,setLogin] = useState(false)
    const [variant,setVariant] = useState('contained');
    const [variant2,setVariant2] = useState('outlined');
    const [usertype,setUsertype] = useState('candidate')
    const [email2,setEmail2] = useState('')
    const [email3,setEmail3] = useState('')
    const [password2,setPassword2] = useState('')
    const [forgotpassword,setForgotPassword] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const [token,setToken] = useState('')
    const [newpassword,setNewpassword] = useState('')
    const [newpassword2,setNewpassword2] = useState('')
    const navigate = useNavigate()
    const validationSchema = Yup.object({
        username:Yup.string().required('Username  is required'),
        email: Yup.string().email('Invalid email!').required('Email  is required'),
        phonenumber:Yup.string().matches(regx,'Invalid phonenumber').required('Phone number is required'),
        password:Yup.string().trim().min(6,'password must have 6 or more characters').required('Password is required'),
        confirmPassword:Yup.string().equals([Yup.ref('password'),null],'Passwords do not match!')
        })
    const userInfo = {
            username:'',
            email:'',
            phonenumber:0,
            password:'',
            confirmPassword:''
    }
    const signUp = async(values)=>{
        try {
        await client.post('/signup',{
        username:values.username,
        email:values.email,
        phonenumber:values.phonenumber,
        password:values.password,
        usertype:"employer"  
        }).then((response)=>{
        console.log(response.data)
        toast.success('Signup Successfull')
        })
        } catch (error) {
            if(error.message === "Request failed with status code 400"){
            toast.error('Kindly input the missing fields')
            }else if (error.message === "Request failed with status code 401"){
            toast.error('Email  already exists') 
            }else if (error.message === "Network Error" || error.message === "Request failed with status code 500"){
            toast.error('Network error. Please check your internet connection')
            }   
        }
    }

    const handleSignin = async ()=>{
        try {
        await client.post('/login',{
            email:email2,
            password:password2
        }).then((response)=>{
            console.log(response.data)
            if(response.data.success){
                localStorage.setItem('hrId',response.data.id )
                toast.success('Login successfull')
                setTimeout(() => {
                  navigate('/managejob2')
          
                }, 2000);
               
            } 
        })  
        } catch (error) {
            if(error.message === "Request failed with status code 400"){
            toast.error('Kindly input the missing fields')
            }else if (error.message === "Request failed with status code 401" || error.message === "Request failed with status code 404"){
            toast.error('Wrong credentials') 
            }else if (error.message === "Network Error"){
            toast.error('Network error. Please check your internet connection')
               }
        }
    }
    const handleSendReset = async ()=>{
      await client.post('/reset',{
        email:email3
       }).then((response)=>{
        if(response.data){
          toast.success('Check your email')
        }
       })
    }
    const handleReset = async()=>{
      if(newpassword2 !== newpassword){
        toast.error('Passwords do not match')
     }else if(!newpassword || !newpassword2){
         toast.error('Enter the missing fields')
     } else{
      try {
        const response = await client.post('/newpassword',{
                sentToken:token,
                password:newpassword
        })
        if(response.data){
           toast.success('Password set successfull')
           setToken('')
           setLogin(true)  
        }   
        } catch (error) {
            console.log(error.message)
        }
     }
    }
    useEffect(()=>{
    setToken(searchParams.get("token"))
   
    },[])
  return (
    <div>
    <ToastContainer
            position="top-right" 
            autoClose={3000}
            hideProgressBar={true}
        />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
    
            <IconButton onClick={handleClose} sx={{float:"right",mt:-5,mx:-5}}>
                <CloseIcon sx={{color:"black"}}/>
            </IconButton>
        <Box sx={{justifyContent:"center", alignItems:"left", textAlign:"left"}}>

         {!login && !forgotpassword &&  !token &&
         <>
         <Typography variant="p" component="h2" sx={{textAlign:"center",mb:2}}>Sign Up</Typography>
         <Typography color="text.disabled" sx={{mb:3}}><b>Signup and get access to all our features</b></Typography>
         {/* <Stack direction="row" spacing={2}>
          <Button variant={variant}  onClick={handleButton}   startIcon={<PersonIcon/>}><b>Candidate</b></Button>
          <Button variant={variant2} onClick={handleButton2} startIcon={<ApartmentIcon/>}><b>Employer</b></Button>
         </Stack> */}
    
         <Formik 
         initialValues={userInfo} 
         validationSchema={validationSchema} 
         onSubmit={signUp}>
         {(
         {values,
           errors,
           touched,
           handleChange,
           handleBlur,
           handleSubmit})=>{
          const {username,email,phonenumber,password,confirmPassword}= values
          return(
         <>
         <Box sx={{mt:2}}>
            <CustomInput  
             value={username}
             error={touched.username && errors.username}
             onBlur={handleBlur('username')}
             handleChange={handleChange('username')} 
            placeholder="Username*"/>
            <CustomInput name="email"
                value={email}
                error={touched.email && errors.email}
                onBlur={handleBlur('email')}
                handleChange={handleChange('email')}   
                placeholder="Email*"
            />
            <CustomInput 
                value={phonenumber}
                error={touched.phonenumber && errors.phonenumber}
                onBlur={handleBlur('phonenumber')}
                handleChange={handleChange('phonenumber')} 
                placeholder="Phone*"
            />
            <CustomInput
                value={password}
                error={touched.password && errors.password}
                onBlur={handleBlur('password')}
                handleChange={handleChange('password')} 
                placeholder="Password*"/>
            <CustomInput
                value={confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                onBlur={handleBlur('confirmPassword')}
                handleChange={handleChange('confirmPassword')} 
                placeholder="Confirm Password*"/>
         </Box>
         <Typography>Already registered?<span style={{color:'#0d6efd'}} onClick={()=>setLogin(true)}>{" "}Log in here</span></Typography>
         <Button variant="contained" onClick={handleSubmit} fullWidth sx={{mt:1}}><b>Sign Up</b></Button>
         </>
        
     )}}
     </Formik>
     </>
      }
      {login && !forgotpassword && !token &&
         <>
              <Typography variant="p" component="h2" sx={{textAlign:"center",mb:2}}>Sign In</Typography>
         <Typography color="text.disabled" sx={{mb:3}}><b>Signin and get access to all our features</b></Typography>
         <Box sx={{mt:2}}>
            <CustomInput value={email2} handleChange={(e)=>setEmail2(e.target.value)} placeholder="Email*"/>
            <CustomInput value={password2} handleChange={(e)=>setPassword2(e.target.value)} placeholder="Password*"/>
         </Box>
         <Typography sx={{color:'#0d6efd',float:"right"}} onClick={()=>setForgotPassword(true)}>Forgot Password?</Typography>
         <Button variant="contained" fullWidth sx={{mb:2,mt:2}} onClick={handleSignin}><b>Sign in</b></Button>
         <Typography>Don't have an account?<span style={{color:'#0d6efd'}} onClick={()=>setLogin(false)}>{" "}Sign Up</span></Typography>
         </>
       }
       {forgotpassword && 
       <>
       <Typography variant="p" component="h2" sx={{textAlign:"center",mb:5}}>Forgot Password</Typography>
       <Typography color="text.disabled" sx={{mb:3}}><b>Enter your email to receive the reset link</b></Typography>
       <Box sx={{mt:3}}>
            <CustomInput value={email3} handleChange={(e)=>setEmail3(e.target.value)} placeholder="Email*"/>
            {/* <Typography sx={{color:'#0d6efd',float:"right"}} onClick={()=>setLogin(true)}>Login</Typography> */}
            {/* <ArrowBackIcon sx={{float:"right",color:'#0d6efd'}}/> */}
            <Button variant="contained" fullWidth sx={{mb:2,mt:2}} onClick={handleSendReset}><b>Send Reset Link</b></Button>
         </Box>
       </>
       }
      {token && !login &&
      <>
            <Typography variant="p" component="h2" sx={{textAlign:"center",mb:5}}>Reset Password</Typography>
       <Typography color="text.disabled" sx={{mb:3}}><b>Enter your new password</b></Typography>
       <Box sx={{mt:3}}>
            <CustomInput value={newpassword} handleChange={(e)=>setNewpassword(e.target.value)} placeholder="New Password*"/>
            <CustomInput value={newpassword2} handleChange={(e)=>setNewpassword2(e.target.value)}  placeholder="Confirm Password*"/>
            <Button variant="contained" fullWidth sx={{mb:2,mt:2}} onClick={handleReset}><b>Reset Password</b></Button>
        </Box>
      </>}
      </Box>
      </Box>
      </Modal>
    </div>
  );
}
