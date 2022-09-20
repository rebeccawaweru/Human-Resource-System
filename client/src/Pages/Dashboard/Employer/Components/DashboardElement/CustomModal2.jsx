import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import{Box,Button,Typography,Modal,IconButton,InputLabel,FormControl,Select,MenuItem, Alert,Stack} from "@mui/material"
import client from '../../../../../api/client';
import { useState } from 'react';
import { useEffect } from 'react';
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

export default function CustomModal2({open,handleClose,id}) {
    const [data,setData] = useState([])
    async function getApp(){
        await client.get('/app/'+id).then((response)=>{
          setData(response.data.app)
          console.log(response.data)
    
        })
    }
    useEffect(()=>{
        getApp()
    },[])
return (
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
            FullName:<b>{data.fullname}</b>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Email:<b>{data.email}</b>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Phone:<b>{data.phone}</b>
          </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Job Title:<b>{data.jobtitle}</b> 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        CV Summary:<b>{data.summary}</b> 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        CV Upload: 
        </Typography>
          
        </Box>
      </Modal>
    </div>
  );
}
