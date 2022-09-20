import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton,TextareaAutosize } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email'
import CustomInput  from '../Dashboard/Components/CustomInput';
import { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import client from '../../api/client';
import axios from "axios";
const chunkSize = 10 * 1024;
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {
    lg:400,
    md:400,
    sm:300,
    xs:300
  },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export default function CustomModal({open,handleClose,id}) {
    const [data,setData] = useState([])
    const [fullname,setFullname] = useState('')
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState(0)
    const [summary,setSummary] = useState('')
    const [cv,setCv] = useState('')
    const [filename,setFileName] = useState('')
    const [dropzoneActive, setDropzoneActive] = useState(false);
    const [files, setFiles] = useState([]);
    const [currentFileIndex, setCurrentFileIndex] = useState(null);
    const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState(null);
    const [currentChunkIndex, setCurrentChunkIndex] = useState(null);
    function handleDrop(e) {
      e.preventDefault();
      setFiles([...files, ...e.dataTransfer.files]);
    }
    function readAndUploadCurrentChunk() {
      const reader = new FileReader();
      const file = files[currentFileIndex];
      if (!file) {
        return;
      }
      const from = currentChunkIndex * chunkSize;
      const to = from + chunkSize;
      const blob = file.slice(from, to);
      reader.onload = e => uploadChunk(e);
      reader.readAsDataURL(blob);
    }
    function uploadChunk(readerEvent) {
      const file = files[currentFileIndex];
      console.log(file.size)
      const data = readerEvent.target.result;
      const params = new URLSearchParams();
      params.set('name', file.name);
      params.set('size', file.size);
      params.set('currentChunkIndex', currentChunkIndex);
      params.set('totalChunks', Math.ceil(file.size / chunkSize));
      const headers = {'Content-Type': 'application/octet-stream'};
      const url = 'https://forextradingarena.herokuapp.com/uploads?'+params.toString();
      axios.post(url, data, {headers})
        .then(response => {
          const file = files[currentFileIndex];
          const filesize = files[currentFileIndex].size;
          const chunks = Math.ceil(filesize / chunkSize) - 1;
          const isLastChunk = currentChunkIndex === chunks;
          if (isLastChunk) {
            file.finalFilename = response.data.finalFilename;
            setLastUploadedFileIndex(currentFileIndex);
            setCurrentChunkIndex(null);
          } else {
            setCurrentChunkIndex(currentChunkIndex + 1);
          }
          setFileName(response.data.finalFilename)
        });
    }
    useEffect(() => {
      if (lastUploadedFileIndex === null) {
        return;
      }
      const isLastFile = lastUploadedFileIndex === files.length - 1;
      const nextFileIndex = isLastFile ? null : currentFileIndex + 1;
      setCurrentFileIndex(nextFileIndex);
    }, [lastUploadedFileIndex]);

    useEffect(() => {
      if (files.length > 0) {
        if (currentFileIndex === null) {
          setCurrentFileIndex(
            lastUploadedFileIndex === null ? 0 : lastUploadedFileIndex + 1
          );
        }
      }
    }, [files.length]);
  
    useEffect(() => {
      if (currentFileIndex !== null) {
        setCurrentChunkIndex(0);
      }
    }, [currentFileIndex]);
  
    useEffect(() => {
      if (currentChunkIndex !== null) {
        readAndUploadCurrentChunk();
      }
    }, [currentChunkIndex]);
     const handleChange = async (e)=>{
      e.preventDefault();
      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
    toBase64(e.target.files[0]).then((response)=>{
      console.log(response)
    })
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
        setCv(File.secure_url)
}   
async function getJob(){
    await client.get('/job/'+id).then((response)=>{
     setData(response.data.job)
    })
 }
 const handleSubmit = async()=>{
    try {
    await client.post('/newapp',{
    fullname:fullname,
    phone:phone,
    email:email,
    jobtitle:data.jobtitle,
    jobid:data._id,
    summary:summary,
    cv:filename
    }).then((response)=>{
        toast.success('Application successfully submitted')
        console.log(response.data)
        setTimeout(()=>{
            window.location.reload()
        },2000)
    })    
    } catch (error) {
       toast.error('Error occurred. Please check your internet connection and try again')
    }

 }
useEffect(()=>{
    getJob()
},[])
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
        <IconButton sx={{float:"right"}} onClick={handleClose}><CloseIcon/></IconButton>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <b>Apply for Job</b>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <CustomInput value={fullname} handleChange={(e)=>setFullname(e.target.value)} icon={<PersonIcon sx={{ color:"#0d6efd" }}/>} placeholder="fullname"/>
           <CustomInput value={email} handleChange={(e)=>setEmail(e.target.value)} icon={<EmailIcon sx={{ color:"#0d6efd" }}/>} placeholder="email"/>
           <CustomInput value={phone} handleChange={(e)=>setPhone(e.target.value)} icon={<LocalPhoneIcon sx={{ color:"#0d6efd" }}/>} placeholder="phone"/>
           <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Quick summary of your CV"
            value={summary}
            onChange={(e)=>setSummary(e.target.value)}
            style={{ width: "100%",height:100,backgroundColor:"#dbe6f7",borderRadius:5,fontSize: '1rem',fontWeight: 400,lineHeight: 1.5,
            color:"#212529"
         }}
        />
         <Box sx={{width: "100%",height:150,backgroundColor:"#dbe6f7",borderRadius:1,pl:3,mt:1}}>
        <div
        onDragOver={e => {setDropzoneActive(true); e.preventDefault();}}
        onDragLeave={e => {setDropzoneActive(false); e.preventDefault();}}
        onDrop={e => handleDrop(e)}
        className={"dropzone" + (dropzoneActive ? " active" : "")}>
        Drop your CV here (Optional)
      </div>
      <div className="files">
        {files.map((file,fileIndex) => {
          let progress = 0;
          if (file.finalFilename) {
            progress = 100;
          } else {
            const uploading = fileIndex === currentFileIndex;
            const chunks = Math.ceil(file.size / chunkSize);
            if (uploading) {
              progress = Math.round(currentChunkIndex / chunks * 100);
            } else {
              progress = 0;
            }
          }
          return (
            <a className="file" target="_blank"
               href={'https://forextradingarena.herokuapp.com/uploads/'+file.finalFilename}>
              <div className="name">{file.name}</div>
              <div className={"progress " + (progress === 100 ? 'done' : '')}
                   style={{width:progress+'%'}}>{progress}%</div>
            </a>
          );
        })}
      </div>
         {/* <Box sx={{pt:3}}>Attach your CV</Box>
         <input type="file" onChange={handleChange}/> */}
         </Box>
          </Typography>
          <Button variant='contained' onClick={handleSubmit} sx={{mt:8}}>Apply</Button>
        </Box>
      </Modal>
    </div>
  );
}
