import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { CustomInput } from '../../../Components';
import client from '../../../api/client';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

export default function AdminLogin() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate()
  const [password,setPassword] = React.useState('')
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async ()=>{
    try {
      await client.post('/login',{
          email:"calvinkirochi254@gmail.com",
          password:password
      }).then((response)=>{
          console.log(response.data)
          if(response.data.success){
              localStorage.setItem('hrId',response.data.id )
              toast.success('Login successfull')
              setTimeout(() => {
                navigate('/users')
              }, 2000);
          } 
      })  
      } catch (error) {
          if(error.message === "Request failed with status code 400"){
          toast.error('Kindly input the missing fields')
          }else if (error.message === "Request failed with status code 401" || error.message === "Request failed with status code 404"){
          toast.error('Wrong credentials') 
          }else if (error.message === "Network Error"){
          toast.error('Network error. Please check your internet connection')
             }
      } 
  }
  return (
    <div>
       <ToastContainer
            position="top-right" 
            autoClose={3000}
            hideProgressBar={true}
        />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <i>Admin Login</i> 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
 
          </Typography>
          <CustomInput value={password} handleChange={(e)=>setPassword(e.target.value)} placeholder="Enter password"/>
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
      </Modal>
    </div>
  );
}
