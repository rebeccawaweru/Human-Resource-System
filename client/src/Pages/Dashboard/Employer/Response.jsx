import React,{useState,useEffect} from "react"
import { useLocation, useSearchParams, useNavigate, Navigate } from 'react-router-dom'
import { toast } from "react-toastify";
import client from '../../../api/client';

export default function Response(){
    const [data,setData] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();
    const username = searchParams.get("msisdn_id") //name of payer
    const status = searchParams.get('status')
    const phonenumber = searchParams.get("msisdn_idnum") //phone no.
    const amount = searchParams.get("mc")//amount
    const email = searchParams.get('p1')//email
    const navigate = useNavigate()
     
    useEffect(()=>{
    if(status === "aei7p7yrx4ae34"){
    var post = JSON.parse(localStorage.getItem('postInfo'))
     post.map(async(u)=>{
    await client.post('/newjob', {
             username: username,
             email: email,
             phonenumber: phonenumber,
             photo: u.photo,
             jobtitle: u.jobtitle,
             category: u.category,
             jobtype: u.jobtype,
             experience: u.experience,
             country: u.country,
             city: u.city,
             description: u.description,
             startdate: u.start,
             endate: u.end,
             salary: u.salary,
             website: u.website,
             address: u.address
         }).then((response)=>{
            console.log(response.data)
            toast.success("Your Job Post has successfully been added")
            setTimeout(()=>{
               localStorage.removeItem('postInfo')
               navigate('/jobs')
            },3000)
         }); 
     })
    }

    },[])
    return(
        <div>

     
        </div>
    )
}