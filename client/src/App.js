import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { useState ,useEffect} from 'react';
import axios from "axios";



const baseURL = "http://localhost:3002";

function App() {
 const[auth, setauth] =useState(false);
 const [userData, setUserData] = useState({});


   //function for checking the JWT from backend API
  const valToken = async () => {
    await axios.get(baseURL, { validateStatus: false, withCredentials: true }).then((response) => {
      if(response.status === 403 || response.status === 401){
        setauth(false);
        console.log("Not found", response.data);
      }else{
        setauth(true);
        console.log("Found");
        setUserData(response.data.user);
      }
    });
  }

 useEffect(() => {
  valToken();
 }, []);

 return (
      <div className="App">
          {auth ? (
            <Home isAdmin={userData.Admin} />
          ) : (
            <Login baseURL={baseURL} setauth={setauth}/>
          )}

      </div>
  );
}

// // component to protect routes for user privilige
// const ProtectedRoute = ({originurl,isauth,children})=>{
//   if(isauth){
//     return children;
//   }
//   else{
//     return <Navigate to="/login" replace />
//   }
// }
//
// // component to protect routes for admin privilege
// const AdminProtectedRoute = ({originurl,isadmin,children})=>{
//   if(isadmin){
//     return children;
//   }
//   else{
//     return <Navigate to="/login" replace />
//   }
//
// }

export default App;
