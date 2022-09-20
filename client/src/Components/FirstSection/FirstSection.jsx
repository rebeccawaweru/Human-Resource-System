import {Box,Typography} from '@mui/material'
import SearchFilter from './SearchFilter'
export default function FirstSection(){
    return(
        <Box sx={{textAlign:"left",pl:{
            lg:3,
            md:3,
            xs:3,
            sm:3
        }}}>
        <Box>
        <Typography sx={{mb:3}}><b>We Have <span style={{color:"#0d6efd"}}>208+ </span>Live Jobs </b></Typography>
        </Box>
 
    <Box sx={{
        width:{
            lg:"80%",
            md:"80%",
            xs:"80%",
            sm:"80%"
        }
    }}>
    <Typography sx={{mb:3}} component="h1" variant="h3"><b>Find the  <span style={{color:"#0d6efd"}}>Job</span> that fits your life</b></Typography>
    </Box>
   <Box sx={{
        width:{
        lg:"100%",
        md:"100%",
        xs:"80%",
        sm:"80%"
        }
    }}>
   <Typography>Type your keyword, then click search to find your perfect job.</Typography>
   </Box>

  <SearchFilter/>
    
    <Box sx={{
        width:{
        lg:"100%",
        xs:"60%",
        sm:"60%"
        }
    }}>
    <Typography><b>PopularSearches:</b> Developer,Designer,Architect,Engineer....</Typography>
    </Box>

    </Box>
    )
}