import React,{useState,useEffect} from "react"
import { Sidebar } from "../Admin/Components"
import CustomAppBar from "../Components/CustomAppBar"
import { Box,Typography,Stack,Button,IconButton,} from "@mui/material"
import CircleIcon from '@mui/icons-material/Circle';
import { DataGrid } from '@mui/x-data-grid';
import client from "../../../api/client"
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
export default function ManageJob(){
    const [data,setData] = useState([])
    const id = localStorage.getItem('hrId')
    const navigate = useNavigate()

    const handleEdit = (id)=>{
      navigate(`/editjob/${id}`)
    }
    const handleDelete = async (id)=>{
        try {
         await client.delete('/deletejob/'+id).then((response)=>{
                toast.success("Job post successfully deleted")
                setTimeout(()=>{
                 window.location.reload()
                },2000)
            })
        } catch (error) {
          toast.error('An errror occurred. Please check internet connection and try again')  
        }
    }
    const columns = [
        {
            field: 'photo',
            headerName: 'Image',
            width: 100,
            borderRadius:5,
            editable: true,
            renderCell: (params) => <img style={{height:50,width:50,borderRadius:"50%"}} src={params.value} />, // renderCell will render the component
          },
        { field: "username", headerName: "Posted By", width: 150 },
        { field: "email", headerName: "Email", width: 160 },
        { field: "phonenumber", headerName: "Phone Number", width: 150 },
        { field: "jobtitle", headerName: "Job Title", width: 150 },
        { field: "category", headerName: "Job Category", width: 150 },
        { field: "jobtype", headerName: "Job Type", width: 150 },
        { field: "experience", headerName: "Job Experience", width: 150 },
        { field: "description", headerName: "Job Description", width: 150 },
        { field: "country", headerName: "Country", width: 150 },
        { field: "city", headerName: "City", width: 150 },
        {field: "Action",
        renderCell: (cellValues) => {
          return (
            <Stack direction="row" spacing={1}>
              <IconButton onClick={()=>handleEdit(cellValues.id)}><ModeEditOutlineIcon color="primary"/></IconButton>
              <IconButton onClick={()=>handleDelete(cellValues.id)}><DeleteForeverIcon color="error"/></IconButton>
            </Stack>
        
          );
        }}
    ]
    async function getJobs(){
   await client.get('/user/'+id).then((response)=>{
         client.post('/findjob',{
        email:response.data.user.email
      }).then((response)=>{
        setData(response.data.job)
        if(!response.data.job){

        }
      })
   })
      
  }
    useEffect(()=>{
        getJobs()
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
    <Typography component="h5" variant="h5">Manage Jobs</Typography>
    <Stack direction="row" spacing={2} sx={{mt:2,mb:2}}>
         <Typography>Home</Typography>
        <Box sx={{display:"flex"}}>
        <CircleIcon sx={{fontSize:10,mt:0.8,mx:1}}/>
        <Typography>Dashboard</Typography>
        </Box>
        <Box sx={{display:"flex"}}>
        <CircleIcon sx={{fontSize:10,mt:0.8,mx:1}}/>
        <Typography color="primary">Manage Jobs</Typography>
        </Box>
        </Stack>

    <div style={{ height: 400, width: '100%' }}>
        {!data && <Typography color="text.disabled">NO JOBS POSTED</Typography>}
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