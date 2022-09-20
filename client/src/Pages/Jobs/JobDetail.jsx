import { Box, Typography,Stack,Grid, Button } from "@mui/material";
import React,{useState,useEffect} from "react";
import client from "../../api/client";
import { CustomAppBar } from "../../Components";
import { bg3 } from "../../assets";
import { useParams } from "react-router-dom";
import CustomModal from "./CustomModal";
export default function JobDetail(){
    const [data,setData] = useState([])
    const {id} = useParams()
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)
    async function getJob(){
       await client.get('/job/'+id).then((response)=>{
        setData(response.data.job)
       })
    }
    const handleSubmit=()=>{
        setOpen(true)
    }
    useEffect(()=>{
        getJob()
    },[])

    return(
        <Box sx={{width:"100%", height:"100vh",margin:0,background:"white",position:"relative",}}>
        <CustomAppBar handleSignup={()=>setOpen(true)} handleContact={()=>setOpen2(true)}/>
        <Box component="img" src={bg3} sx={{width:"110%",height:{
            lg:"40vh",
            md:"40vh",
            xs:"40vh",
            sm:"40vh"
        },position:"relative"}}/>
        <Box sx={{position:"absolute",top:{
            lg:"25%",
            md:"25%",
            xs:"15%",
            sm:"15%"
         },ml:{
            lg:100,
            md:90,
            xs:20,
            sm:20
         }}}>
    
         <Typography component="h3" variant="p" sx={{textAlign:"center"}}>{data.jobtitle}</Typography>
         <Typography component="p" variant="p" color="primary">Home-Job Detail</Typography>
        </Box>
        <CustomModal id={id} open={open} handleClose={()=>setOpen(false)}/>

         <Grid container sx={{width:"100%", mt:1, justifyContent:"center",alignItems:"center",texAlign:"center",position:"absolute"}}>
            <Box component="img" src={data.photo} sx={{width:'40%',height:200,borderRadius:5,mb:3}}/>
         </Grid>
         <Box sx={{width:"80%", mt:8, texAlign:"left",position:"relative",top:210,pl:{
            lg:32,
            md:32,
            xs:5,
            sm:5
         },display:"flex"}}>
       
            <Box sx={{width:"100%"}}>
            <Typography><b>{data.jobtitle}</b></Typography>
           <Typography>{data.category}</Typography>
           <Typography>{data.jobtype}</Typography>
           <Typography>{data.experience}</Typography>
           <Typography>{data.address}</Typography>
           <Typography>{data.city},{data.country}</Typography>
           <b>Job Description</b>
            <hr></hr>
           <Typography>{data.description}</Typography>
        
    
           <Typography></Typography>
           <Typography></Typography>
           <Typography></Typography>
         
            </Box>
               <Box sx={{width:"20%",mx:{
                lg:-55,
                md:-55,
                sm:2,
                xs:2
               }}}>
               <Typography>Start Date:{data.startdate}</Typography>
               <Typography>End Date: {data.endate}</Typography>
               <Button onClick={handleSubmit} fullWidth variant="contained" sx={{mt:1}}>Apply Now</Button>
               </Box>
     
  
         </Box>
      
        </Box>
    )
}