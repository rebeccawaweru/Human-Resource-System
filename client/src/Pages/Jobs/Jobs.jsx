import { Box, Typography,Stack,Grid, Button } from "@mui/material";
import React,{useState,useEffect} from "react";
import client from "../../api/client";
import { CustomAppBar } from "../../Components";
import { bg3 } from "../../assets";
import { useNavigate } from "react-router-dom";
import Contact from "../../Components/CustomAppBar/Contact";
import Signup from "../Authentication/Authentication";
export default function Jobs(){
    const navigate = useNavigate()
    const [data,setData] = useState([])
    const [open,setOpen] = useState(false)
    const [open2,setOpen2] = useState(false)
    async function getJobs(){
       await client.get('/jobs').then((response)=>{
        setData(response.data.job)
        console.log(response.data.job)
       })
    }
    useEffect(()=>{
        getJobs()
    },[])
    const handleSubmit = (id)=>{
        navigate('/jobdetail/'+id)
    }
    const handleClose = ()=>{
        window.location.replace("https://www.globalhr.agency/")
       }
    return(
        <Box sx={{width:"100%", height:"100vh",margin:0,background:"white",position:"relative"}}>
        <CustomAppBar handleSignup={()=>setOpen(true)} handleContact={()=>setOpen2(true)} />
        <Contact open={open2} close={()=>setOpen2(false)}/>
        <Box component="img" src={bg3} sx={{width:"100%",height:{
            lg:"40vh",
            md:"40vh",
            xs:"40vh",
            sm:"40vh"
        },position:"relative"}}/>
             <Signup open={open} handleClose={handleClose}/>
        <Box sx={{position:"absolute",top:{
            lg:"25%",
            md:"25%",
            xs:"15%",
            sm:"15%"
         },ml:{
            lg:100,
            md:90,
            xs:25,
            sm:25
         }}}>
         <Typography component="h3" variant="p">Jobs</Typography>
        </Box>

        <Stack direction="row" spacing={4} sx={{width:"100%",pl:{
            lg:5,
            md:5,
            xs:1,
            sm:1
        },mt:6}}>
            <Box sx={{height:"60vh", width:"10%",backgroundColor:"transparent", borderRadius:5,mb:3}}>

            </Box>
        <Grid container sx={{width:"80%",mt:2,display:"flex"}}>
           {data.map((u,key)=>{
           return <Box key={key} sx={{backgroundColor:"white",mb:2,height:250,width:250,borderRadius:3,boxShadow:"10px 10px 10px 10px #d4e6ff",mx:{
            lg:4,
            md:4,
            xs:0,
            sm:0
           },position:"relative",mt:5}}>
       
            <Box component="img" src={u.photo} sx={{width:90,height:80,borderRadius:2,mt:-6,mx:3}}/>
            <Box  sx={{width:100,height:30,borderRadius:1,mt:2,background:"green",float:"right",color:"white",textAlign:"center",justifyContent:"center",alignItems:"center"}}>
               <b>{u.jobtype}</b>
            </Box>

            <Box sx={{justifyContent:"center", alignItems:"center",textAlign:"left",pl:2,mt:3,overflow:"hidden"}}>
                <Box>
                <Typography conponent="h3" variant="h6"><b>{u.jobtitle}</b></Typography>
                </Box>
                <Box>
                <Typography conponent="h3" variant="p">{u.address}</Typography>   
                </Box>
                <Box>
                <Typography conponent="h3" variant="p">{u.city},{u.country}</Typography>
                </Box>
                <Box>
                <a href="">{u.website}</a>
                </Box>
                <Box sx={{position:"absolute", bottom:0,float:"right"}}>
                <Button  color="primary" onClick={()=>handleSubmit(u._id)}><b>Browse Job</b></Button>
                </Box>
    
            </Box>


            </Box>
           })}
         


        </Grid>

        </Stack>

        </Box>
    )
}