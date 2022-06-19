import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { useState ,useEffect} from 'react';
import axios from "axios";

// component to protect routes for user privilige
const ProtectedRoute = ({originurl,isauth,children})=>{
  if(isauth){
    return children;
  }
  else{
    return <Navigate to="/login" replace />
  }
}

// component to protect routes for admin privilege
const AdminProtectedRoute = ({originurl,isadmin,children})=>{
  if(isadmin){
    return children;
  }
  else{
    return <Navigate to="/login" replace />
  }

}


function App() {
 const[auth,setauth] =useState(false);
 const[admin,setadmin]=useState(false);

 const validate= async()=>{
  const result=await axios.post("http://localhost:3002/api/user/login",{"name":"user",
  "email":"user@gmail.com",
  "password":"user123"});

  if(result.status==200){
    setauth(true);
  }
  else{
    setauth(false);
  }
  if(result.data.Admin){
    setadmin(true);
  }
  else{
    setauth(false);
  }

 }

 useEffect(() => {
  validate();
 }, []);

 return (
    <div className="App">
      <Routes>

        <Route path="/" element={
            <ProtectedRoute originurl={"/"} isauth={auth}>
              <Home />
            </ProtectedRoute>
          } />

        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
