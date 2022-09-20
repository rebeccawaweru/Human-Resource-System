import * as React from 'react';
import { Box } from '@mui/material';
export default function CustomInput({placeholder,error,handleChange,type,value,onBlur,name,icon}){
    return(
        <Box sx={{display:"flex",mb:3}}>
         <Box sx={{mt:2,mx:2,position:"absolute"}}>
           {icon}
        </Box>
        <input  type={type} value={value} onBlur={onBlur} name={name} onChange={handleChange} placeholder={placeholder} 
        style={{width:"100%",height:"60px",backgroundColor:"#dbe6f7",border:"none",borderRadius:"10px",fontSize:"1rem",
        fontWeight:'400PX',
        lineHeight:1.5,
        color: "#212529",
        paddingLeft:"42px",
        }}/>
        </Box>
    )
}