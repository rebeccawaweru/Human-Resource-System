import {Box,Grid, Typography,Button} from '@mui/material'
import Carousel from './Carousel'
export default function ThirdSection(){
    return(
    <Grid container sx={{display:"flex",width:"100%", height:300,background:"white"}}>
     <Box sx={{width:"40%", background:"whitesmoke",textAlign:"left",p:5,}}>
     <Typography color="primary" component="h3" variant="p">Jobs by Categories</Typography>
     <Typography component="h3" variant="h3">Choose Your Desired Category</Typography>
     </Box>
     <Box sx={{width:"40%",p:5}} >
     <Typography sx={{display:{
        lg:"block",
        md:"block",
        xs:"none",
        sm:"none"
     }}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry the standard dummy text ever since the  when an printer took.</Typography>

     {/* <Carousel/> */}
     </Box>
    
     </Grid>
    )
}