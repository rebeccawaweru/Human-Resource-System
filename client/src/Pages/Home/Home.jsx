import React,{useEffect} from 'react'
import {Box} from '@mui/material'
import {useSearchParams} from 'react-router-dom'
import { CustomAppBar,FirstSection,SecondSection,ThirdSection,FourthSection,Footer} from '../../Components'
import { bg1} from '../../assets'
import Signup from '../Authentication/Authentication'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Contact from '../../Components/CustomAppBar/Contact'
export default function Home(){
    const navigate = useNavigate()
    const [open,setOpen] = useState(false)
    const [open2,setOpen2] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams();
    const token = searchParams.get("token") //order id
    const handleClose = ()=>{
     window.location.replace("https://www.globalhr.agency/")
     
    }
   useEffect(()=>{
    if(token){
        setOpen(true)
    }
   })
    return(
    <Box sx={{width:"100%",height:"100%",justifyContent:"center",alignItems:"center",textAlign:"center",overflow:"hidden"}}>
        <CustomAppBar handleSignup={()=>setOpen(true)} handleContact={()=>setOpen2(true)}/>
        <Contact open={open2} close={()=>setOpen2(false)}/>
        <Box component="img" src={bg1} sx={{width:"100%",height:{
            lg:"98vh",
            md:"98vh",
            xs:"128vh",
            sm:"128vh"
        },position:"relative"}}/>
        <Signup open={open} handleClose={handleClose}/>
         <Box sx={{position:"absolute",top:{
            lg:"25%",
            md:"25%",
            xs:"15%",
            sm:"15%"
         }}}>
         <FirstSection/>
         </Box>
         <SecondSection/>
         <ThirdSection/>
         <FourthSection/>
         <Footer/>
    </Box>
    )
}