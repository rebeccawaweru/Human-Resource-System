import { Box, Button, Typography,Stack,TextareaAutosize} from "@mui/material"
import { Sidebar } from "../Admin/Components"
import { CustomAppBar,CustomInput } from "../Components"
import CircleIcon from '@mui/icons-material/Circle';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import SchoolIcon from '@mui/icons-material/School';
import TranslateIcon from '@mui/icons-material/Translate';
import GridOnIcon from '@mui/icons-material/GridOn';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
export default function Profile(){
    return(
    <Box sx={{width:"100%", height:"130%",minWidth:"100%", overflow:"scroll",margin:0,display:"flex",background:"white",position:"relative"}}>
    <Sidebar/>
    <Box sx={{width:"100%",background:"whitesmoke",height:"100%"}}>
    <CustomAppBar/>
    <Box sx={{mt:10,color:"black",ml:{
        lg:38,
        md:38,
        sm:15,
        xs:15
    },mr:{
        lg:2,
        md:2,
        xs:0,
        sm:0
    }}}>
    <Typography component="h5" variant="h5">My Profile</Typography>
        <Stack direction="row" spacing={2} sx={{mt:2}}>
         <Typography>Home</Typography>
        <Box sx={{display:"flex"}}>
        <CircleIcon sx={{fontSize:10,mt:0.8,mx:1}}/>
        <Typography>Dashboard</Typography>
        </Box>
        <Box sx={{display:"flex"}}>
        <CircleIcon sx={{fontSize:10,mt:0.8,mx:1}}/>
        <Typography color="primary">Profile</Typography>
        </Box>
        </Stack>
        <Box sx={{width:"90%",height:"45vh",backgroundColor:"white",borderRadius:5,mt:2,p:3}}>
        <Typography component="h3" variant="p">Update Profile Image</Typography>
        <hr></hr>
        <Box className="profile" sx={{width:120,height:120,border:"10px solid whitesmoke",borderRadius:5,justifyContent:"center",aligniTems:"center",textAlign:"center",p:5}}>
        <Box sx={{mt:12}}>
        <input type="file" className="upload_btn2"/>
         <div className="overlay-layer2">Upload</div>
        </Box>
        </Box>
        </Box>
        <Box sx={{width:"90%",height:{
            lg:"165vh",
            md:"165vh",
            xs:"158vh",
            sm:"120vh"
        },backgroundColor:"white",borderRadius:5,mt:2,p:{
            lg:3,
            md:3,
            sm:1,
            xs:1
        }}}>
        <Typography component="h3" variant="p">Basic Information</Typography>
        <hr></hr>
        <Stack direction="row" spacing={2}>
            <Box sx={{width:"50%"}}>
        User Name
        <CustomInput icon={<PersonIcon sx={{ color:"#0d6efd" }}/>} placeholder="Devid"/>
        </Box>
         <Box sx={{width:"50%"}}>
         Phone
        <CustomInput icon={<LocalPhoneIcon sx={{ color:"#0d6efd" }}/>} placeholder="(+254) 7XXXXXXXX"/>
         </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
        <Box sx={{width:"50%"}}>
        Email Address
        <CustomInput icon={<EmailIcon sx={{ color:"#0d6efd" }}/>} placeholder="Devid@example.com"/>
        </Box>
        <Box sx={{width:"50%"}}>
       Language
        <CustomInput icon={<TranslateIcon  sx={{ color:"#0d6efd" }}/>} placeholder="e.g English, Spanish"/>
       </Box>
       </Stack>

       <Stack direction="row" spacing={2}>
        <Box sx={{width:"50%"}}>
       Qualification
        <CustomInput icon={<SchoolIcon sx={{ color:"#0d6efd" }}/>} placeholder="Qualification"/>
        </Box>
        <Box sx={{width:"50%"}}>
         Experience
        <CustomInput icon={<ModeEditIcon  sx={{ color:"#0d6efd" }}/>} placeholder="Eg 3 year experince"/>
       </Box>
       </Stack>

       <Stack direction="row" spacing={2}>
        <Box sx={{width:"50%"}}>
      Job Category
        <CustomInput icon={<GridOnIcon sx={{ color:"#0d6efd" }}/>} placeholder="Job Category"/>
        </Box>
    
       </Stack>
       <Stack direction="row" spacing={2}>
        <Box sx={{width:"50%"}}>
        Current Salary
        <CustomInput icon={<AttachMoneyIcon sx={{ color:"#0d6efd" }}/>} placeholder="Current Salary"/>
        </Box>
       <Box sx={{width:"50%"}}>
       Expected Salary
        <CustomInput icon={<AttachMoneyIcon sx={{ color:"#0d6efd" }}/>} placeholder="Expected Salary"/>
       </Box>
       </Stack>
       Age
       <CustomInput icon={<AccessibilityNewIcon sx={{ color:"#0d6efd" }}/>} placeholder="Age"/>
       Description
       <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Greetings! We are Galaxy Software Development Company. We hope you enjoy our services and quality."
            style={{ width: "100%",height:100,backgroundColor:"#dbe6f7",borderRadius:5,fontSize: '1rem',fontWeight: 400,lineHeight: 1.5,
            color:"#212529" }}
            />
        <Button variant="contained">Save Changes</Button>
        </Box>
        <Box sx={{width:"90%",height:"75vh",backgroundColor:"white",borderRadius:5,mt:2,p:{
            lg:3,
            md:3,
            xs:1,
            sm:1
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