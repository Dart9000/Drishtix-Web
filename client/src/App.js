import './App.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import { useState ,useEffect} from 'react';
import axios from "axios";
import Register from './pages/login/register';


const baseURL = "http://localhost:3002";

function App() {
 const[auth, setauth] =useState(false);
 const [userData, setUserData] = useState({});


   //function for checking the JWT from backend API
  const valToken = async () => {
    await axios.get(baseURL, { validateStatus: false, withCredentials: true }).then((response) => {
      if(response.status === 403 || response.status === 401){
        setauth(false);
      }else{
        setauth(true);
        setUserData(response.data.user);
      }
    });
  }

 useEffect(() => {
  valToken();
 }, []);

 return (
   <Router>
     <div className="App">
          {auth ? (
            <Routes>
              <Route path="/" element={
                <Home isAdmin={userData.isAdmin} />
              } />
            
              <Route path="/register" element={
                userData.isAdmin?(
                <Register baseURL={baseURL}  />
                ):(
                  <h1>access denied</h1>
                )
             
              } />
              
            </Routes>
          ) : (
            <Login baseURL={baseURL} setauth={setauth}/>
          )}
      </div> 
    </Router>
  );
}


export default App;
