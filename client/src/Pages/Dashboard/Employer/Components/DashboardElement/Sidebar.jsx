import React from 'react';
import {Box,List,Collapse,ListItemButton, Typography} from "@mui/material"
import { logo } from '../../../../../assets';
import { CustomListItem } from '../../../../../Components';
import HomeIcon from '@mui/icons-material/Home';
import PersonPinIcon from '@mui/icons-material/PersonPin';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoneyIcon from '@mui/icons-material/Money';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useNavigate } from 'react-router-dom';

export default function Sidebar() {
    const [open, setOpen] = React.useState(false);

    const navigate = useNavigate()
    const handleClick = () => {
      setOpen(!open);
    };
    const handleLogout = ()=>{
        localStorage.removeItem('hrId')
          navigate('/')
    }

  return (
    <Box sx={{ width:{
        lg:"20%",
        md:"20%",
        xs:"18%",
        sm:"18%"
    },bgcolor:'#d4e6ff',height:"100vh",position:"fixed",p:{
        lg:3,
        md:3,
        xs:3,
        sm:3
    },  overflow: 'scroll' }}>
        <List>
            <Box component="img" src={logo} sx={{height:50,width:{
                lg:200,
                md:200,
                xs:80,
                sm:80
            },mb:{
                lg:2,
                md:2,
                sm:1,
                xs:1
            },mx:{
                lg:1,
                md:1,
                xs:0,
                sm:0
            }}}/>
             <CustomListItem onclick={()=>navigate("/postjob")} title="Dashboard" icon={<HomeIcon/>} />
             {/* <CustomListItem title="Company Profile" onclick={()=>navigate('/employer')} icon={<PersonPinIcon/>} /> */}

            <ListItemButton onClick={handleClick} sx={{mx:-2}}>
            <CustomListItem title="Jobs" icon={<BusinessCenterIcon/>} />
             {open ? <ExpandMore sx={{mx:15}} /> : <NavigateNextIcon sx={{mx:15}} />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{backgroundColor:"white",color:"#0d6efd",width:"120%",ml:{
                lg:4,
                md:4,
                sm:0,
                xs:0
            },borderRadius:5 }}>

            <ListItemButton onClick={()=>navigate("/postjob")}  sx={{ pl:{
                lg:4,
                md:4,
                xs:1,
                sm:1
            },mb:-1 }} >
                <Box  sx={{display:{
                    lg:"block",
                    md:"block",
                    sm:"none",
                    xs:"none"
                }}}>
                  <CustomListItem   title="Post a New Job" />
                </Box>
            <Typography onClick={()=>navigate("/postjob")} sx={{mb:4,display:{
                    lg:"none",
                    md:"none",
                    sm:"block",
                    xs:"block"
                }}}>Post a New Job</Typography>
            </ListItemButton>

            <ListItemButton onClick={()=>navigate("/managejob2")}  sx={{ pl:{
                lg:4,
                md:4,
                xs:1,
                sm:1
            } }}>
            <Box sx={{display:{
                    lg:"block",
                    md:"block",
                    sm:"none",
                    xs:"none"
                }}}>
                  <CustomListItem title="Manage Jobs" />
                </Box>
            <Typography onClick={()=>navigate("/managejob2")}  sx={{display:{
                  lg:"none",
                  md:"none",
                  sm:"block",
                  xs:"block"
                }}}>Manage Jobs</Typography>
            </ListItemButton>
            </List>
            </Collapse>
             <CustomListItem title="Candidates" onclick={()=>navigate('/applications')} icon={<PeopleAltIcon/>} />
             <CustomListItem title="Bookmark Resumes" icon={<BookmarkIcon/>} />
             <CustomListItem title="Packages" icon={<MoneyIcon/>} />
  
             <CustomListItem title="Resume Alerts" icon={<NotificationsIcon/>} />
             <CustomListItem title="Change Password" icon={<FingerprintIcon/>} />
             <CustomListItem title="Delete Profile" icon={<DeleteIcon/>} />
             <CustomListItem title="Logout" onclick={handleLogout} icon={<ExitToAppIcon/>} />

        </List>
    </Box>
  );
}
