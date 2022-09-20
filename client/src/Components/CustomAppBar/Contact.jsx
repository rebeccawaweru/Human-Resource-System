import * as React from 'react';
import {Box,Button,Typography,Modal,IconButton,TextareaAutosize} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import CustomInput from '../CustomInput/CustomInput';
import client from '../../api/client';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function Contact({open,close,order,amount}) {
const [email,setEmail] = React.useState('')
const [phone,setPhone] = React.useState('')
const [message,setMessage] = React.useState('')
const [success, setSuccess] = React.useState('')
const [error, setError] = React.useState('')
const handleSubmit = async ()=>{
if(!email || !phone || !message){
setError("Kindly enter the required fields")
}
const response = await client.post('/newmessage', {
    email:email,
    phonenumber:phone,
    message:message,
})
if(response.data.success){
  toast.success("Message sent successfully")
 
   setTimeout(()=>{
    window.location.reload()
   }, 2000)
}

}
  return (
    <div>
      <Modal
        open={open}
        onClose={close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <IconButton sx={{float:"right",mb:5}} onClick={close}>
            <CloseIcon/>
            </IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{mt:5}}>
          {/* {success && <CustomAlert message={success} color="success"/>}
          {error && <CustomAlert message={error} color="error"/> } */}
          </Typography>
          <Typography id="modal-modal-description" variant="h6" component="h3" sx={{ mt: 2,mb:2 }}>
            Contact Us
          </Typography>
       
          <CustomInput placeholder="email" border="1px black solid" value={email} handleChange={(e)=>setEmail(e.target.value)} fullWidth/>
          <CustomInput placeholder="07XXXXXXXX" border="1px black solid" value={phone} handleChange={(e)=>setPhone(e.target.value)} fullWidth/>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={6}
            placeholder="write message...."
            style={{ width: 380,border:"1px solid black" }}
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
           />
           <Box sx={{display:"flex"}}>
           {/* <CustomButton title="Send" onClick={handleSubmit} /> */}
           <Button variant='contained' onClick={handleSubmit}>Send</Button>

           {/* <Box sx={{mx:1}}>
           <a href="https://wa.me/0782666555/?text=Hello, i would like to place an order" style={{textDecoration:"none"}}>or contact us on WhatsApp
           <IconButton>
           <WhatsAppIcon sx={{color:"green"}}/>
           </IconButton>
           </a>
           </Box> */}
    
           </Box>
  
        </Box>
      </Modal>
    </div>
  );
}