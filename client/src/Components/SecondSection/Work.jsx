import {Box,Typography} from "@mui/material"
export default function Work({number,bg,src,title1,title2}){
    return(
        <Box sx={{textAlign:"left",mx:3,height:{
            xs:250,
            sm:250
        }}}>
        <Typography variant="h3" component="h3" color="text.disabled"><b>{number}</b></Typography>
        <Box sx={{width:{
            lg:200,
            md:200,
            xs:200,
            sm:200
        },height:100,mx:5,backgroundColor:bg,position:"relative",borderRadius:4,color:"white",justifyContent:"center",alignItems:"center",textAlign:"left"}}>
          <Typography component="p" variant="p" sx={{mx:{
            lg:8,
            md:8,
            xs:8,
            sm:8
          }}}><b>{title1}<br></br> {title2}</b></Typography>
        </Box>
        <Box sx={{width:120,backgroundColor:"white",position:"absolute",top:{
            lg:140,
            md:140,
        },borderRadius:4,mx:{
            lg:-3,
            md:-3,
            xs:-3,
            sm:-3
        },mt:{
            lg:-5,
            md:-5,
            xs:-10,
            sm:-10
        },justifyContent:"center",alignItems:"center",textAlign:"center"}}>
            <Box component="img" src={src} sx={{height:100,width:80,mt:1,mx:3}}/>
        </Box>
        </Box> 
    )
}
