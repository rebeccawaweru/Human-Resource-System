import {Box,Grid,Typography} from '@mui/material'
import Work from './Work'
import { work1,work2,work3 } from '../../assets'
export default function SecondSection(){
    return(
        <Box sx={{position:"relative",height:{
            lg:300,
            md:300,
            xs:800,
            sm:800
        },pl:{
            lg:3,
            md:3
        }}}>
        <Typography component="h3" variant="h5"><b>How It Works</b></Typography>
        <Grid container sx={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
        <Work number="01" bg="#3898e2" title1="Register" title2="Your Account" src={work1}/>
        <Work number="02" bg="#bc84ca" title1="Apply" title2="For Your Dream Job" src={work2}/>
        <Work number="03" bg="#56d8b1" title1="Upload" title2="Your Resume" src={work3}/>
        </Grid>
        </Box>   
    )
}