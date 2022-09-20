import { Box, Button, Typography } from "@mui/material";
import { cvupload } from "../../assets";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
export default function FourthSection(){
    return(
        <Box className="bg2" sx={{width:"100%", height:"110vh",display:{
          lg:"flex",
          md:"flex",
          xs:"block",
          sm:"block"
        },pl:{
          lg:3,
          md:3,
          xs:0,
          sm:0
        }}}>
           <Box sx={{width:"40%"}}>
           <Box component="img" src={cvupload} sx={{height:"100vh",width:"100%",mt:3, display:{
            lg:"block",
            md:"block",
            xs:"none",
            sm:"none"
           }}}/>
           </Box> 

           <Box sx={{width:"60%"}}>
            <Box sx={{backgroundColor:"#1967d2",width:"100%",height:{
              lg:"80vh",
              md:"80vh",
              xs:"90vh",
              sm:"90vh"
            },mt:{
              lg:5,
              md:5,
              xs:10,
              sm:10
            },borderRadius:5,mx:2,textAlign:"left",color:"white",p:8,mb:3}}>
              <Typography component="h3" variant="p">Explore Life</Typography>
              <Typography component="h3" variant="h3">Don’t just find. be found put your CV in front of great employers</Typography>
            
            <Button variant="contained" endIcon={<FileUploadOutlinedIcon/>} sx={{background:"white",color:"black",mt:5,height:60}}><b>Upload Resume</b></Button>
            </Box>
           </Box>
 
        </Box>
    )
}