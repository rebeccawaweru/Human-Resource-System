import * as React from 'react';
import {Box,List,Collapse,ListItemButton, Typography} from "@mui/material"
import { logo } from '../../../../assets';
import { CustomListItem } from '../../../../Components';
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
import { useEffect } from 'react';
import client from '../../../../api/client';
export default function Sidebar() {
    const [open, setOpen] = React.useState(false);
    const [admin,setAdmin] = React.useState(false);
     const navigate = useNavigate()
    const handleClick = () => {
      setOpen(!open);
    };
    const handleLogout = ()=>{
        localStorage.removeItem('hrId')
        navigate('/')
    }
    const id = localStorage.getItem('hrId')
    async function getUser(){
       await client.get('/user/'+id).then((response)=>{
        console.log(response.data.user.usertype)
           if(response.data.user.usertype === "admin"){
                setAdmin(true)
           }
       })
    }
    useEffect(()=>{
       getUser()
    },[])
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
            <Box component="img" src={logo} sx={{height:48,width:{
                lg:200,
                md:200,
                xs:80,
                sm:80
            },mb:{
                lg:3,
                md:3,
                sm:1,
                xs:1
            },mx:{
                lg:1,
                md:1,
                xs:0,
                sm:0
            }}}/>

        <CustomListItem onclick={()=>navigate("/postjob")} title="Dashboard" icon={<HomeIcon/>} />
             {admin && <CustomListItem title="Users" onclick={()=>navigate("/users")}  icon={<PeopleAltIcon/>} />}
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
           {admin && <CustomListItem title="All Jobs" onclick={()=>navigate('/managejob')} icon={<BookmarkIcon/>} />   } 
            <CustomListItem title="Candidates" onclick={()=>navigate('/applications')} icon={<PeopleAltIcon/>} />
             <CustomListItem title="Bookmark Resumes" icon={<BookmarkIcon/>} />
             <CustomListItem title="Packages" icon={<MoneyIcon/>} />
             {admin && <CustomListItem title="Messages" onclick={()=>navigate('/message')}  icon={<EmailIcon/>} />}
             <CustomListItem title="Resume Alerts" icon={<NotificationsIcon/>} />
             <CustomListItem title="Change Password" icon={<FingerprintIcon/>} />
             <CustomListItem title="Delete Profile" icon={<DeleteIcon/>} />
             <CustomListItem onclick={handleLogout} title="Logout" icon={<ExitToAppIcon/>} />

        </List>
    </Box>
  );
}
