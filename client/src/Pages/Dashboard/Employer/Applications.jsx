import React,{useState,useEffect} from "react"
import { Sidebar } from "../Admin/Components"
import CustomAppBar from "../Components/CustomAppBar"
import { Box,Typography,Stack,Button,IconButton,Modal} from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';
import { DataGrid } from '@mui/x-data-grid';
import client from "../../../api/client"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CustomModal2 from "./Components/DashboardElement/CustomModal2";
import { ExportToExcel } from "../../ExportToExcel"
import CloseIcon from '@mui/icons-material/Close';
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

export default function Applications(){
    const [data,setData] = useState([])
    const [data2,setData2] = useState([])
    const [appId,setAppid] = useState('')
    const [open,setOpen] = useState(false)
    const fileName = "Applications";
    const navigate = useNavigate()
    async function getApplications(){
        await client.get("/apps").then((response)=>{
           setData(response.data.app) 
        })
    }
    const handleView = async (id)=>{
      setOpen(true)
    await client.get('/app/'+id).then((response)=>{
      setData2(response.data.app)
      
    })
    }
    const handleClose = ()=>setOpen(false)
    const handleViewCV=async(id)=>{
         await client.get('/app/'+id).then((response)=>{
            console.log(response.data.app.cv)
            window.location.replace('https://forextradingarena.herokuapp.com/uploads/'+response.data.app.cv)
         })
    }
    const handleDelete = async (id)=>{
        try {
         await client.delete('/deleteapp/'+id).then((response)=>{
                toast.success("Application successfully deleted")
                setTimeout(()=>{
                 window.location.reload()
                },2000)
            })
        } catch (error) {
          toast.error('An errror occurred. Please check internet connection and try again')  
        }
    }
    const columns = [
        { field: "fullname", headerName: "Full Name", width: 150 },
        { field: "phone", headerName: "Phone Number", width: 150 },
        { field: "email", headerName: "Email", width: 150 },
        { field: "jobtitle", headerName: "Job", width: 150 },
        { field: "summary", headerName: "CV Summary", width: 150 },
        { field: "cv", renderCell: (cellValues) => {
            return (
             <Button onClick={()=>handleViewCV(cellValues.id)}>View CV</Button>
            );
          } },
        
        {field: "Action",
        renderCell: (cellValues) => {
          return (
            <Stack direction="row" spacing={1}>
              <IconButton onClick={()=>handleView(cellValues.id)}><RemoveRedEyeIcon color="primary"/></IconButton>
              <IconButton onClick={()=>handleDelete(cellValues.id)}><DeleteForeverIcon color="error"/></IconButton>
            </Stack>
        
          );
        }}
    ]
    useEffect(()=>{
        getApplications()
    },[])
    return(
    <Box sx={{width:"100%", height:"130%",minWidth:"100%", overflow:"scroll",margin:0,display:"flex",background:"white",position:"relative"}}>
            <ToastContainer
            position="top-right" 
            autoClose={3000}
            hideProgressBar={true}
        />
            <Sidebar/>
  
        <Box sx={{width:"100%",background:"white",height:"100vh"}}>
        <CustomAppBar/>
        <Box sx={{mt:10,color:"black",ml:{
     lg:53,
     md:53,
        sm:25,
        xs:17
    },mr:{
        lg:0,
        md:0,
        xs:0,
        sm:0
    }}}>
    <Typography component="h5" variant="h5">Job Applications</Typography>
    <Stack direction="row" spacing={2} sx={{mt:2,mb:2}}>
         <Typography>Home</Typography>
        <Box sx={{display:"flex"}}>
        <CircleIcon sx={{fontSize:10,mt:0.8,mx:1}}/>
        <Typography>Dashboard</Typography>
        </Box>
        <Box sx={{display:"flex"}}>
        <CircleIcon sx={{fontSize:10,mt:0.8,mx:1}}/>
        <Typography color="primary">Candidates</Typography>
        </Box>
        </Stack>
        <Box sx={{mb:2}}>
        <ExportToExcel apiData={data} fileName={fileName} />
        </Box>
        <div style={{ height: 400, width: '100%' }}>
        <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <IconButton sx={{float:"right"}} onClick={handleClose}><CloseIcon/></IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Appliaction Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            FullName:<b>{data2.fullname}</b>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Email:<b>{data2.email}</b>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Phone:<b>{data2.phone}</b>
          </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Job Title:<b>{data2.jobtitle}</b> 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        CV Summary:<b>{data2.summary}</b> 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        CV Upload: <b>{data2.cv}</b> 
        </Typography>
          
        </Box>
      </Modal>
    </div>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowId={(row) => row._id}
      />
    </div>
    </Box>
        </Box>
    </Box>
    )
}