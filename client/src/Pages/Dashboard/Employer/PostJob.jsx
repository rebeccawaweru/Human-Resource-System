import React,{useState,useEffect} from "react";
import { Box, Button,IconButton,Modal, Typography,Stack,TextareaAutosize,Select,MenuItem,InputLabel} from "@mui/material"
import { Sidebar } from "../Admin/Components"
import { CustomAppBar,CustomInput } from "../Components"
import CircleIcon from '@mui/icons-material/Circle';
import LanguageIcon from '@mui/icons-material/Language';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import HomeIcon from '@mui/icons-material/Home';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { CountryDropdown, RegionDropdown,} from 'react-country-region-selector';
import { ToastContainer, toast } from 'react-toastify';
import client from "../../../api/client";
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from "react-router-dom";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function PostJob(){
  const id = localStorage.getItem('hrId')
  const [data,setData] = useState([])
  const [open,setOpen] = useState(false)
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [title,setTitle] = useState('')
    const [category,setCategory] = useState('')
    const [type,setType] = useState('')
    const [salary,setSalary] = useState('')
    const [experience,setExperience] = useState('')
    const [website,setWebsite] = useState('')
    const [address,setAddress] = useState('')
    const [description,setDescription] = useState('')
    const [start,setStart] = useState('')
    const [end,setEnd] = useState('')
    const [image,setImage] = useState('')
    const [url,setUrl] = useState('')
    const navigate = useNavigate()
    const handleChange=async(e)=>{
      e.preventDefault();
      const files = e.target.files;
      const data = new FormData()
      data.append("file", files[0])
      data.append("upload_preset", "Images");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/marite/image/upload",
        {
          method:"POST",
          body:data
        }
      )
      const File = await res.json()
      setImage(File.secure_url)

  }
  
  const handlePublish = async ()=>{
    try {
      if(data.usertype === "admin"){
      await client.post('/newjob',{
        username:data.username,
        email:data.email,
        phonenumber:data.phonenumber,
        photo:image,
        jobtitle:title,
        category:category,
        jobtype:type,
        experience:experience,
        country:country,
        city:city,
        description:description,
        startdate:start,
        endate:end,
        salary:salary,
        website:website,
        address:address
      }).then((response)=>{
        console.log(response.data)
        toast.success("Job successfully created")
        setTimeout(()=>{
          navigate('/managejob')
        },3000)
      }) 
      }else if (data.usertype === "employer"){
         setOpen(true)
      }
    } catch (error) {
      if(error.message === "Request failed with status code 400"){
        toast.error('Kindly enter the required fields')
        }else if (error.message === "Network Error" || error.message === "Request failed with status code 500"){
        toast.error('Network error. Please check your internet connection')
        }   
    }
  }
  async function getUser(){
    await client.get('/user/'+id).then((response)=>{
      setData(response.data.user)
    })
  }
  const handleClose = ()=>{
    setOpen(false)
  }
  const handlePay = async ()=>{
    const post = []
    post.push({
      photo:image,
      jobtitle:title,
      category:category,
      jobtype:type,
      experience:experience,
      country:country,
      city:city,
      description:description,
      startdate:start,
      endate:end,
      salary:salary,
      website:website,
      address:address })
      localStorage.setItem('postInfo', JSON.stringify(post));
 
    client.post('/ipay-api',{
      username:data.username,
      email:data.email,
      phone:data.phonenumber,
      amount: "1",

    }).then(response=>setUrl(response.data))
      if(url != ''){
        window.location.replace(url);
    }
  }
  useEffect(()=>{
    getUser()
  },[])
    return(
    <Box sx={{width:"100%", height:"100%", overflow:"scroll",margin:0,display:"flex",background:"white",position:"relative"}}>
          <ToastContainer
            position="top-right" 
            autoClose={3000}
            hideProgressBar={true}
        />
    <Sidebar/>
    <Box sx={{width:"100%",background:"whitesmoke",height:"100%"}}>
    <CustomAppBar/>
    <Box sx={{mt:10,color:"black",ml:{
       lg:53,
       md:53,
          sm:25,
          xs:17
    },mr:{
        lg:2,
        md:2,
        xs:0,
        sm:0
    }}}>

    <Typography component="h5" variant="h5">Post a Job</Typography>
        <Stack direction="row" spacing={2} sx={{mt:2}}>
         <Typography>Home</Typography>
        <Box sx={{display:"flex"}}>
        <CircleIcon sx={{fontSize:10,mt:0.8,mx:1}}/>
        <Typography>Dashboard</Typography>
        </Box>
        <Box sx={{display:"flex"}}>
        <CircleIcon sx={{fontSize:10,mt:0.8,mx:1}}/>
        <Typography color="primary">Job Submission Form</Typography>
        </Box>
        </Stack>
        <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <IconButton sx={{float:"right"}} onClick={handleClose}><CloseIcon/></IconButton>
        <Box sx={{mt:4,mb:2}}>
        <b>Make payment in order to proceed</b>
        </Box>

          <Button onClick={handlePay} variant="contained">Pay</Button>
        
        </Box>
      </Modal>
    </div>
        <Box sx={{width:"90%",height:{
            lg:"176vh",
            md:"185vh",
            xs:"180vh",
            sm:"180vh"
        },backgroundColor:"white",borderRadius:5,mb:3,mt:2,p:{
            lg:3,
            md:3,
            sm:1,
            xs:1
        }}}>
        <Box sx={{display:"flex"}}>
            <BusinessCenterIcon />
        <Typography component="h3" variant="p">Job Details</Typography>
            </Box>
        <hr></hr>
        <Typography component="p" variant="p" ><b>Add A Photo</b></Typography>
        <input type="file" onChange={handleChange} />
        {image && <Box>
        <Box component="img" src={image} sx={{width:200,height:200,border:"1px solid black",borderRadius:3}}/>
        </Box>}
        <Stack direction="row" spacing={2}>
        <Box sx={{width:"50%"}}>
       Job Title
        <CustomInput value={title} handleChange={(e)=>setTitle(e.target.value)} icon={<AssignmentIcon sx={{ color:"#0d6efd" }}/>} placeholder="Job Title"/>
        </Box>
        <Box sx={{width:"50%"}} >
      <InputLabel id="demo-simple-select-label">Job Category</InputLabel>
        <Select
        sx={{backgroundColor:"#dbe6f7",lineHeight:1.5,
        color: "#212529",borderRadius:"10px",fontSize:"1rem",}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Job Type"
          placeholder="Job Type"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          fullWidth>
          <MenuItem disabled selected>Select Category</MenuItem>
          <MenuItem value="Accounting and Finance">Accounting and Finance</MenuItem>
          <MenuItem value="Clerical and Data Entry">Clerical and Data Entry</MenuItem>
          <MenuItem value="Hotel and Catering">Hotel and Catering</MenuItem>
          <MenuItem value="Counseling">Counseling</MenuItem>
          <MenuItem value="Court Administration">Court Administration</MenuItem>
          <MenuItem value="Human Resources">Human Resources</MenuItem>
          <MenuItem value="Investigative">Investigative</MenuItem>
          <MenuItem value="IT and Computers">IT and Computers</MenuItem>
          <MenuItem value="Law Enforcement">Law Enforcement</MenuItem>
          <MenuItem value="Management">Management</MenuItem>
          <MenuItem value="Public Relations">Public Relations</MenuItem>
          <MenuItem value="Miscellanous">Miscellanous</MenuItem>
         </Select>
        </Box>
        </Stack>
        <Stack direction="row" spacing={2}>
        <Box sx={{width:"50%"}}>
       <InputLabel id="demo-simple-select-label"> Job Type</InputLabel>
        <Select
        sx={{backgroundColor:"#dbe6f7",lineHeight:1.5,
        color: "#212529",borderRadius:"10px",fontSize:"1rem",}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Job Type"
          placeholder="Job Type"
          value={type}
          onChange={(e)=>setType(e.target.value)}
          fullWidth>
          <MenuItem disabled selected>Select Type</MenuItem>
          <MenuItem value="Full Time"> Full Time</MenuItem>
          <MenuItem value="Freelance">Freelance</MenuItem>
          <MenuItem value="Part Time">Part Time</MenuItem>
          <MenuItem value="Internship">Internship</MenuItem>
          <MenuItem value="Temporary">Temporary</MenuItem>
         </Select>
         </Box>
        <Box sx={{width:"50%"}}>
        <InputLabel id="demo-simple-select-label">Offered Salary (Optional*)</InputLabel>
       <Select
        sx={{backgroundColor:"#dbe6f7",lineHeight:1.5,
        color: "#212529",borderRadius:"10px",fontSize:"1rem",}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Job Type"
          placeholder="Job Type"
          value={salary}
          onChange={(e)=>setSalary(e.target.value)}
          fullWidth>
          <MenuItem disabled selected>Select Salary</MenuItem>
          <MenuItem value="10,000">10,000</MenuItem>
          <MenuItem value="20,000">20,000</MenuItem>
          <MenuItem value="30,000">30,000</MenuItem>
          <MenuItem value="40,000">40,000</MenuItem>
          <MenuItem value="50,000+">50,000+</MenuItem>
         </Select>
        </Box>
        </Stack>
        <Stack direction="row" spacing={2} sx={{mt:1}}>
        <Box sx={{width:"100%"}}>
       Experience
        <CustomInput value={experience} handleChange={(e)=>setExperience(e.target.value)} icon={<ModeEditIcon  sx={{ color:"#0d6efd" }}/>} placeholder="E.g minimum 3 years"/>
       </Box>
        </Stack>
       <Stack direction="row" spacing={2}>
       <Box sx={{width:"50%"}}>
        Country
        <Box sx={{width:"100%", mb:2}}>
        <CountryDropdown
        style={{height:"8vh",width:"100%",backgroundColor:"#dbe6f7",borderRadius:"10px",}}
          value={country}
          onChange={(e) => setCountry(e)} /> 
        </Box>
        {/* <CustomInput icon={<PublicIcon sx={{ color:"#0d6efd" }}/>} placeholder="Country"/> */}
       </Box>
       <Box sx={{width:"50%"}}>
        City
        <Box sx={{width:"100%", mb:2}}>
        <RegionDropdown
        defaultOptionLabel="Select City"
        style={{height:"8vh",width:"100%",backgroundColor:"#dbe6f7",borderRadius:"10px"}}
        country={country}
        value={city}
        onChange={(e) =>setCity(e)} />
         </Box>
        {/* <CustomInput icon={<LocationOnIcon sx={{ color:"#0d6efd" }}/>} placeholder="City"/> */}
       </Box>
       </Stack>
       <Stack direction="row" spacing={2}>
       <Box sx={{width:"50%"}}>
       Website (Optional*)
        <CustomInput value={website} handleChange={(e)=>setWebsite(e.target.value)} icon={<LanguageIcon sx={{ color:"#0d6efd" }}/>} placeholder="https://.."/>
       </Box>
       <Box sx={{width:"50%"}}>
       Complete Address (Optional*)
       <CustomInput value={address} handleChange={(e)=>setAddress(e.target.value)} icon={<HomeIcon sx={{ color:"#0d6efd" }}/>} placeholder="e.g 1363-1385 Sunset Blvd Los Angeles, CA 90026, USA"/>
       </Box>
       </Stack>
       Description
       <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Greetings! We are Galaxy Software Development Company. We hope you enjoy our services and quality."
            style={{ width: "100%",height:100,backgroundColor:"#dbe6f7",borderRadius:5,fontSize: '1rem',fontWeight: 400,lineHeight: 1.5,
            color:"#212529"
         }}
         value={description} 
         onChange={(e)=>setDescription(e.target.value)}
            />
     <Stack direction="row" spacing={2}>
       <Box sx={{width:"50%"}}>
        Start Date (Optional*)
        <CustomInput value={start} handleChange={(e)=>setStart(e.target.value)} type="date" />
        </Box>
        <Box sx={{width:"50%"}}>
         End Date (Optional*)
        <CustomInput value={end} handleChange={(e)=>setEnd(e.target.value)} type="date"  />
       </Box>
       </Stack>
        <Button variant="contained" onClick={handlePublish}>Publish Job</Button>
        </Box>
    </Box>
    </Box>
    </Box>
    )
}