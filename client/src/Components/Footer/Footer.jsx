import { Box,Stack, Typography,Button,TextField} from "@mui/material"
import CustomInput from "../CustomInput/CustomInput"
import { logo } from "../../assets"
export default function Footer(){
   const d = new Date();
   let year = d.getFullYear();
    return(
     <Box sx={{height:"40vh",width:"100%",background:"black",color:"white",p:{
      lg:5,
      md:5,
      xs:1,
      sm:1
     },}}>
      <Stack direction="row" spacing={2}>
        <Box sx={{width:"40%",textAlign:"left"}}>
        <Typography> Join our email subscription now to get updates on new jobs and notifications</Typography>   
        </Box>
         <Box sx={{width:"45%",textAlign:"left",display:{
            lg:"flex",
            md:"flex",
            xs:"block",
            sm:"block"
         },}}>
         <TextField fullWidth sx={{backgroundColor:"white"}} variant="filled"/>
            <Button variant="contained" sx={{height:58,mt:{
               lg:0,
               md:0,
               xs:2,
               sm:2
            }}}>Subscribe Now</Button>
         </Box>
      </Stack>
      <hr></hr>
      <Stack  direction="row" spacing={6}>
       <Box component="img" src={logo} sx={{height:80,width:200,display:{
         lg:"block",
         md:"block",
         xs:"none",
         sm:"none"
       }}}/>
       <Box>
        <Typography component="p" variant="p"><b>For Candidates</b></Typography>
       </Box>
       <Box>
        <Typography component="p" variant="p"><b>For Employers</b></Typography>
       </Box>
       <Box>
        <Typography component="p" variant="p"><b>Helpful Resources</b></Typography>
       </Box>
       <Box>
        <Typography component="p" variant="p"><b>Quick Links</b></Typography>
       </Box>
      </Stack>
      <hr></hr>
   Copyright © {year} GlobalHR All Rights Reserved.
     </Box>
    )
}