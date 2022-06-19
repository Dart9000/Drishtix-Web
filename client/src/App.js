import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { useState } from 'react';

let isauth;
function App() {
 const[auth,setauth] =useState(false);
 
 
 return (
    <div className="App">
      hiii welcome 
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

// component to protect routes
const ProtectedRoute = ({originurl,isauth,children})=>{
  if(isauth){
    return children;
  }
  else{
    return <Navigate to="/login" replace />
  }

}


export default App;
