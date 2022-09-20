import { Box,Typography } from "@mui/material"
const CustomInput = ({placeholder,error,handleChange,type,value,onBlur,name,onFocus})=>{
    return(
    <Box sx={{mb:2}}>
    {error ? (
                <Box sx={{mb:1}}>
                <Typography style={{ color: 'red', fontSize: 10 }}>{error}</Typography>
                </Box>
            ) : null}
    <input type={type} onFocus={onFocus} value={value} onBlur={onBlur} name={name} onChange={handleChange} placeholder={placeholder} 
    style={{width:"100%",height:"60px",backgroundColor:"#dbe6f7",border:"none",borderRadius:"10px",fontSize:"1rem",
    fontWeight:'400PX',
    lineHeight:1.5,
    color: "#212529",
    paddingLeft:"20px"}}/>
    </Box>
    )
}

export default CustomInput;