import logo from './logo.svg';
import './App.css';
import {ContentAdmin2, Home,Employer,Profile,PostJob,Users,ManageJob,EditJob,Jobs,Response,JobDetail,Application,AdminLogin,ManageJob2,Messages} from './Pages';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path='/'>
      <Route index element={<Home/>} />
      <Route path='employer' element={<Employer/>}/>
      <Route path='managejob' element={<ManageJob/>}/>
      <Route path='profile' element={<Profile/>}/>
      <Route path='postjob' element={<PostJob/>}/>
      <Route path='users' element={<Users/>}/>
      <Route path='jobs' element={<Jobs/>}/>
      <Route path='editjob/:id' element={<EditJob/>}/>
      <Route path='jobdetail/:id' element={<JobDetail/>}/>
      <Route path="applications" element={<Application/>}/>
      <Route path="adminlogin" element={<AdminLogin/>}/>
      <Route path = "managejob2" element={<ManageJob2/>}/>
      <Route path="cbk" element={<Response/>}/>
      <Route path="message" element={<Messages/>}/>
      <Route path="contentadmin2" element={<ContentAdmin2/>}/>
    </Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
