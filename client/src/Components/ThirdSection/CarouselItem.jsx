import Carousel from 'react-bootstrap/Carousel';
import {Box,Grid, Typography} from '@mui/material'
 const CarouselItem=()=>{
    return(
        <Carousel style={{width:"100%"}}>
        <Carousel.Item interval={1000}>
        <Box sx={{width:200,height:70,backgroundColor:"red"}}>
        </Box>
       </Carousel.Item>
       </Carousel>
    )
}
export default CarouselItem