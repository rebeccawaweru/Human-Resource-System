import React,{useState,useEffect} from 'react';
import {Box,Typography} from '@mui/material'
import {CustomButton,CourseData,CustomAlert} from '../index'
import CustomInput from './CustomInput'
import client from '../../api/client'
import axios from 'axios';
import ShareIcon from '@mui/icons-material/Share';
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

export default function CustomPayment({id}) {
  const [data,setData] = useState([])
   const [loading,setLoading] = useState(false)
  const [url,setUrl] = useState('')
  const user = localStorage.getItem('userId')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState(0)
  const [discount, setDiscount] = useState('')
  const [message,setMessage] = useState('Request failed with status code 404')
  const [disc, setDisc] = useState('')
  React.useEffect(() => {

      
    },[])

  
  const handleOpen = (id) => {
    client.post('/ipay-api',{
        username:username,
        email:email,
        phone:phone,
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
        address:address,
        amount: "1",
   
      }).then(response=>setUrl(response.data))
        if(url != ''){
          window.location.replace(url);
      }
  };

   return (
   <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center"}}>
          {email && <CustomButton title="PAY" onClick={handleOpen}/>}
        
   
   </Box>

    

  );
}
