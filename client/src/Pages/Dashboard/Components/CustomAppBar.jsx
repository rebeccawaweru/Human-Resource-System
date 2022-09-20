import React,{useState,useEffect} from 'react';
import {AppBar,Tooltip,Avatar,Box,Toolbar,IconButton,Badge,Typography} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import HomeIcon from '@mui/icons-material/Home';
import { avatar1 } from '../../../assets';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import client from '../../../api/client'
export default function CustomAppBar() {
    const [anchorEl, setAnchorEl] = React.useState();
    const open = Boolean(anchorEl);
    const id = localStorage.getItem('hrId')
    const [data,setData] = useState({
        username:'',
        avatar:''
    })
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const navigate = useNavigate()
    async function getUser(){
      client.get('/user/'+id).then((response)=>{
          setData(response.data.user)
      })
    }
    useEffect(()=>{
      getUser()
    },[])
  return (
      <AppBar position="fixed" elevation={0} sx={{width:{
        lg:"75%",
        md:"75%",
        xs:"69%",
        sm:"69%"
      },background:"transparent",color:"black",borderBottom:"1px solid whitesmoke"}}>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display:{
            lg:"block",
            md:"block",
            xs:"none",
            sm:"none"
          } }} />
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="primary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={17} color="primary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Avatar alt="Cindy Baker" src={data.avatar} sx={{mx:2}}/>
            <Box sx={{mt:1.5,mr:-2}}>
            <Typography>{data.username}</Typography> 
            </Box>
            <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <KeyboardArrowDownIcon  sx={{ width: 28, height: 28, color:"#0d6efd" }}/>
          </IconButton>
        </Tooltip>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem sx={{mb:-3}}>
        <HomeIcon color='primary'/>
        <p>Dashboard</p>
        </MenuItem>
        <MenuItem sx={{mb:-3}}>
        <EmailIcon  color='primary'/>
        <p>Messages</p>
        </MenuItem>
        <MenuItem sx={{mb:-3}}>
        <PersonIcon  color='primary'/>
        <p>Profile</p>
        </MenuItem>
        <MenuItem sx={{mb:-3}}>
        <ExitToAppIcon color='primary'/>
        <p>Logout</p>
        </MenuItem>        
      </Menu>
          </Box>
        </Toolbar>
      </AppBar>
  );
}
