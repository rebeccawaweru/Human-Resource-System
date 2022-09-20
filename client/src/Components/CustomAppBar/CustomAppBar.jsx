import {AppBar,Box,Toolbar,Typography,Button, Stack} from '@mui/material'
import { logo } from '../../assets';
import LoginIcon from '@mui/icons-material/Login';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import CustomButton from '../CustomButton/CustomButton';
import CustomDrawer from '../CustomDrawer/CustomDrawer';
import { useNavigate } from 'react-router-dom';
import Contact from './Contact';
import AdminLogin from '../../Pages/Dashboard/Admin/AdminLogin';
import { useState } from 'react';
const CustomAppBar = ({handleSignup,handleContact})=>{
        const navigate = useNavigate()
    
        return (
        <Box sx={{width:"100%"}}>
              <AppBar position="fixed" elevation={0} sx={{backgroundColor:"white", color:"black"}}>
                <Toolbar >
                    <Box component="img" src={logo} sx={{mr:2, width:200,height:52,}}/>
                    <Box sx={{display:{
                        xs:"none",
                        sm:"none",
                        lg:"block",
                        md:"block"
                        }}}>
                    <Typography variant="h6" component="div" sx={{ justifyContent:"center",alignItems:"center",textAlign:"center" }}>
            
                    <Stack direction="row" spacing={2} sx={{ml:40,color:"inherit"}}>
                     <CustomButton title="Home" onClick={()=>navigate('/')}/>
                     <CustomButton title="Jobs" onClick={()=>navigate('/jobs')}/>
                     <CustomButton title="Contact" onClick={handleContact}/>
                     <CustomButton title="Admin" onClick={()=>navigate('/adminlogin')} />
                    </Stack>
          
                  </Typography>
                    </Box>
                  <Button sx={{mx:1,fontSize:"10px"}} variant="outlined" onClick={handleSignup} startIcon={<LoginIcon/>}>
                       SignUp
                  </Button>
                  <Button variant="contained" startIcon={<CardTravelIcon/>}>
                      <Typography sx={{display:{
                        xs:"none",
                        sm:"none",
                        lg:"block",
                        md:"block"
                    },fontSize:"10px"}}>Post a Job</Typography> 
                  </Button>
                  <CustomDrawer sx={{border:"none", display:{
                        xs:"block",
                        sm:"block",
                        lg:"none",
                        md:"none"
                    }}}/>
                </Toolbar>
              </AppBar>
              </Box>
       
          );
}
export default CustomAppBar;