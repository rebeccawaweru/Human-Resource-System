import React,{useState,useEffect} from "react"
import { Sidebar } from "./Components"
import CustomAppBar from "../Components/CustomAppBar"
import { Box,Typography,Stack } from "@mui/material"
import axios from "axios"
import CircleIcon from '@mui/icons-material/Circle';
import { DataGrid } from '@mui/x-data-grid';
import client from "../../../api/client"
import { ExportToExcel } from "../../ExportToExcel"
export default function Users(){
    const [data,setData] = useState([])
    const fileName = "Users";
    async function getUsers(){
        await client.get("/users").then((response)=>{
           setData(response.data.users) 
           console.log(data)
        })
    }
    const columns = [
        { field: "username", headerName: "User Name", width: 150 },
        { field: "phonenumber", headerName: "Phone Number", width: 150 },
        { field: "email", headerName: "Email", width: 150 },
        { field: "usertype", headerName: "User Type", width: 150 },
    ]
const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },

];
    useEffect(()=>{
        getUsers()

    },[])
    return(
    <Box sx={{width:"100%", height:"130%",minWidth:"100%", overflow:"scroll",margin:0,display:"flex",background:"white",position:"relative"}}>
            <Sidebar/>
        <Box sx={{width:"100%",background:"white",height:"100vh"}}>
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
    <Typography component="h5" variant="h5">Users</Typography>
    <Stack direction="row" spacing={2} sx={{mt:2,mb:2}}>
         <Typography>Home</Typography>
        <Box sx={{display:"flex"}}>
        <CircleIcon sx={{fontSize:10,mt:0.8,mx:1}}/>
        <Typography>Dashboard</Typography>
        </Box>
        <Box sx={{display:"flex"}}>
        <CircleIcon sx={{fontSize:10,mt:0.8,mx:1}}/>
        <Typography color="primary">Users</Typography>
        
        </Box>

        </Stack>
        <Box sx={{mb:2}}>
        <ExportToExcel apiData={data} fileName={fileName} />
        </Box>
 
        <div style={{ height: 400, width: '100%', }}>
      <DataGrid

        rows={data}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      
        getRowId={(row) => row._id}
      />
    </div>
    </Box>
        </Box>
    </Box>
    )
}