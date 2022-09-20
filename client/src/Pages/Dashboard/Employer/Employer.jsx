import { Box, Button, Typography} from "@mui/material"
import { Sidebar } from "../Admin/Components"
import { CustomAppBar,CustomInput } from "../Components"
import { Stack } from "@mui/system"
import CircleIcon from '@mui/icons-material/Circle';
import { companylogo } from "../../../assets";
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import ExpandIcon from '@mui/icons-material/Expand';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import YouTubeIcon from '@mui/icons-material/YouTube';
export default function Employer(){
    return(
        <Box sx={{width:"100%", height:"130%",minWidth:"100%", overflow:"scroll",margin:0,display:"flex",background:"white",position:"relative"}}>
        <Sidebar/>
        <Box sx={{width:"100%",background:"whitesmoke",height:"100%"}}>
        <CustomAppBar/>

        <Box sx={{mt:10,color:"black",ml:{
           lg:49,
           md:49,
           sm:25,
           xs:17
    },mr:{
        lg:2,
        md:2,
        xs:0,
        sm:0
    }}}>
        <Typography component="h5" variant="h5">Company Profile!</Typography>
        <Stack direction="row" spacing={2} sx={{mt:2}}>
         <Typography>Home</Typography>
        <Box sx={{display:"flex"}}>
        <CircleIcon sx={{fontSize:10,mt:0.8,mx:1}}/>
        <Typography>Dashboard</Typography>
        </Box>
        <Box sx={{display:"flex"}}>
        <CircleIcon sx={{fontSize:10,mt:0.8,mx:1}}/>
        <Typography color="primary">Company Profile</Typography>
        </Box>
        </Stack>
        <Box sx={{width:"90%",height:"80vh",backgroundColor:"white",borderRadius:5,mt:2,p:{
            lg:3,
            md:3,
            sm:1,
            xs:1
        }}}>
        <Typography component="h3" variant="p">Logo and Cover Image</Typography>
        <hr></hr>
        <Box sx={{width:120,height:120,border:"1px solid grey",borderRadius:5,justifyContent:"center",aligniTems:"center",textAlign:"center",p:5}}>
        <Box component="img" src={companylogo} sx={{width:100,height:100}}/>   
        <input type="file" className="upload_btn"/>
         <div className="overlay-layer">Upload</div>
        </Box>
        <Typography component="p" variant="p"><b>Company Logo</b></Typography>
        <Box sx={{width:{
            lg:"80%",
            md:"80%",
            sx:"60%",
            xs:"60%"
        }, height:90,backgroundColor:"#dbe6f7",mt:2,borderRadius:5,p:{
            lg:5,
            md:5,
            xs:1,
            sm:1
        }}}>
        <div className="dropZoneContainer">
            <input type="file" id="drop_zone" className="FileUpload" accept=".jpg,.png,.gif" />
            <div className="dropZoneOverlay">Click here to add file</div>
        </div>
        </Box>
        <Typography component="p" variant="p"><b>Background Banner Image</b></Typography>
        </Box>
        
        <Box sx={{width:"90%",height:{
            lg:"138vh",
            md:"138vh",
            xs:"120vh",
            sm:"120vh"
        },backgroundColor:"white",borderRadius:5,mt:2,p:{
            lg:3,
            md:3,
            sm:1,
            xs:1
        }}}>
        <Typography component="h3" variant="p">Basic Information</Typography>
        <hr></hr>
        Company Name
        <CustomInput icon={<PersonIcon sx={{ color:"#0d6efd" }}/>} placeholder="Devid"/>
        Phone
        <CustomInput icon={<LocalPhoneIcon sx={{ color:"#0d6efd" }}/>} placeholder="(+254) 7XXXXXXXX"/>
        Email Address
        <CustomInput icon={<EmailIcon sx={{ color:"#0d6efd" }}/>} placeholder="Devid@example.com"/>
        Website
        <CustomInput icon={<LanguageIcon sx={{ color:"#0d6efd" }}/>} placeholder="https://.."/>
        Est. Since
        <CustomInput icon={<AccessTimeFilledIcon sx={{ color:"#0d6efd" }}/>} placeholder="Since..."/>
        Team Size
        <CustomInput icon={<ExpandIcon sx={{ color:"#0d6efd" }}/>} placeholder="team-size"/>
        <Button variant="contained">Save Changes</Button>
        </Box>
        <Box sx={{width:"90%",height:"45vh",backgroundColor:"white",borderRadius:5,mt:2,p:{
            lg:3,
            md:3,
            sm:1,
            xs:1
        }}}>
        <Typography component="h3" variant="p">Photo Gallery</Typography>
        <hr></hr>
        <Box sx={{width:{
            lg:"80%",
            md:"80%",
            sx:"60%",
            xs:"60%"
        }, height:90,backgroundColor:"#dbe6f7",mt:2,borderRadius:5,p:5}}>
        <div className="dropZoneContainer">
            <input type="file" id="drop_zone" className="FileUpload" accept=".jpg,.png,.gif" />
            <div className="dropZoneOverlay">Click here to upload files</div>
        </div>
        </Box>
        <Button sx={{mt:3}} variant="contained">Save Changes</Button>
        </Box>
        <Box sx={{width:"90%",height:"75vh",backgroundColor:"white",borderRadius:5,mt:2,p:{
            lg:3,
            md:3,
            sm:1,
            xs:1
        },mb:3}}>
        <Typography component="h3" variant="p">Social Network</Typography>
        <hr></hr>
         <Stack direction="row" spacing={1}>
          <Box>
            Facebook
            <CustomInput icon={<FacebookOutlinedIcon sx={{ color:"#0d6efd" }}/>} placeholder="https://www.facebook.com/"/>
          </Box>
          <Box>
            Twitter
            <CustomInput icon={<TwitterIcon sx={{ color:"#0d6efd" }}/>} placeholder="https://twitter.com/"/>
          </Box>
          <Box>
           Linkedin
            <CustomInput icon={<LinkedInIcon sx={{ color:"#0d6efd" }}/>} placeholder="https://in.linkedin.com/"/>
          </Box>
         </Stack>
         <Stack direction="row" spacing={1}>
          <Box>
          Whatsapp
            <CustomInput icon={<WhatsAppIcon sx={{ color:"#0d6efd" }}/>} placeholder="https://www.whatsapp.com/"/>
          </Box>
          <Box>
          Instagram
            <CustomInput icon={<InstagramIcon sx={{ color:"#0d6efd" }}/>} placeholder="https://www.instagram.com/"/>
          </Box>
          <Box>
          Pinterest
            <CustomInput icon={<PinterestIcon sx={{ color:"#0d6efd" }}/>} placeholder="https://in.pinterest.com/"/>
          </Box>
         </Stack>
         <Stack direction="row" spacing={1}>
          <Box>
          Tumblr
            <CustomInput icon={<FormatSizeIcon sx={{ color:"#0d6efd" }}/>} placeholder="https://www.tumblr.com/"/>
          </Box>
          <Box>
          Youtube
            <CustomInput icon={<YouTubeIcon sx={{ color:"#0d6efd" }}/>} placeholder="https://www.youtube.com/"/>
          </Box>
         </Stack>
        <Button sx={{mt:3}} variant="contained">Save Changes</Button>
        </Box>
        </Box> 

        </Box>
        </Box>
    )
}