import { Stack,Box,Typography,Button} from "@mui/material"
import CustomSelect from "../CustomSelect/CustomSelect"
export default function SearchFilter(){
    return(
        <Stack direction={{
            lg:"row",
            md:"row",
            sx:"column",
            xs:"column"
        }} spacing={{
            lg:2,
            md:2,
            xs:1,
            sm:1
        }} sx={{backgroundColor:"white", width:{
            lg:"90%",
            md:"90%",
            xs:"80%",
            sm:"80%"
        }, height:{
            lg:"16vh",
            md:"16vh",
            xs:"50vh",
            sm:"50vh"
        },borderRadius:5,mx:0.5,mt:3,mb:3,textAlign:"left",pt:3,pl:{
            lg:0,
            md:0,
            xs:2,
            sm:2
        }}}>
         <Box sx={{textAlign:"left",mx:{
            lg:3,
            md:3,
            xs:0,
            sm:0
         }}}>
            <Typography><b>WHAT</b></Typography>
            <CustomSelect label="Job Title"/>
         </Box>
         <Box sx={{textAlign:"left"}}>
            <Typography><b>TYPE</b></Typography>
            <CustomSelect label="All Categories"/>
         </Box>
         <Box sx={{textAlign:"left"}}>
            <Typography ><b>LOCATION</b></Typography>
            <CustomSelect label="Location"/>
         </Box>
         <Box>
         <Button variant="contained" sx={{height:{
            lg:"10vh",
            md:"10vh",
            xs:"10vh",
            sm:"10vh"
         },width:{
            lg:140,
            md:140,
            xs:280,
            sm:280
         }}}><b>Find Job</b></Button>
         </Box>
        </Stack>
    )
}