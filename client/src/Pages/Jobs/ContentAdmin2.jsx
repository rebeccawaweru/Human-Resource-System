import React, { useState,useEffect } from 'react';
// Import styles
import "./ContentAdmin.css"
import {Box,Typography,InputLabel,MenuItem,FormControl,Select, CardMedia} from '@mui/material'

import client from '../../api/client'
import axios from "axios";
const chunkSize = 10 * 1024;
function ContentAdmin2() {
    const [course, setCourse] = useState("");
    const [topic, setTopic] = useState("")
    const [dropzoneActive, setDropzoneActive] = useState(false);
    const [files, setFiles] = useState([]);
    const [view,setView] = useState([])
    const [currentFileIndex, setCurrentFileIndex] = useState(null);
    const [lastUploadedFileIndex, setLastUploadedFileIndex] = useState(null);
    const [currentChunkIndex, setCurrentChunkIndex] = useState(null);
    const [filename,setFileName] = useState('')
    const [success,setSuccess] = useState('')
    const handleCourse = (event)=>{
        setCourse(event.target.value);
    }
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
      const handleSubmit = async(req,res)=>{
         await client.post('/newcourse',{
            course:course,
            topic:topic,
            file:filename
         }).then((response)=>{
            setSuccess('Course File Uploaded Successfully')
            setTimeout(()=>{
                window.location.reload()
            },3000)
        })
      }
    return (
      <Box sx={{margin: 0, padding:0,boxSizing:"border-box",width:"100%",height:"100vh",
      overflowX: "hidden",display:"flex"}}>
         <Box sx={{width:"100%"}}>
      
           <Box sx={{pl:3}}>

       
        <Box sx={{display:"flex",mt:2}}>

        </Box>
        <Box sx={{mb:2}}>
        {/* <CustomButton title="Upload" onClick={handleSubmit}/> */}
        </Box>
      <div
        onDragOver={e => {setDropzoneActive(true); e.preventDefault();}}
        onDragLeave={e => {setDropzoneActive(false); e.preventDefault();}}
        onDrop={e => handleDrop(e)}
        className={"dropzone" + (dropzoneActive ? " active" : "")}>
        Drop your files here
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
               href={'https://globalhr.herokuapp.com/uploads/'+file.finalFilename}>
              <div className="name">{file.name}</div>
              <div className={"progress " + (progress === 100 ? 'done' : '')}
                   style={{width:progress+'%'}}>{progress}%</div>
            </a>
          );
        })}
      </div>
      </Box>
      </Box>
  
      </Box>
    );
}

export default ContentAdmin2;