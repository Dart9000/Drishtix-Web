import './App.css';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import HandOver from './pages/login/HandOver';
import LiveCam from './pages/LiveCam/LiveCam';
import { useState ,useEffect} from 'react';
import axios from "axios";
import Register from './pages/login/register';
import Createcriminal from './pages/createCriminal/Createcriminal';
import Navbar from './Components/Navbar/Navbar';

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

 return (<>
   <Router>

     <div className="App">
            <Navbar auth={auth}/>
            <div className='app_body'>
            <Routes>
              <Route path="/" element={
                auth ? (
                  <Home isAdmin={userData.isAdmin} />
                ) : (
                  <Login baseURL={baseURL} setauth={setauth}/>
                )

              } />

              <Route path="/register" element={
                auth ? (
                  userData.isAdmin?(
                    <Register baseURL={baseURL}  />
                  ):(
                    <h1>access denied</h1>
                  )
                ) : (
                  <Login baseURL={baseURL} setauth={setauth}/>
                )
              } />
               <Route path="/create_criminal" element={
                 auth ? (
                   !userData.isAdmin?(
                   < Createcriminal baseURL={baseURL} />
                   ):(
                     <h1>access denied</h1>
                   )
                 ) : (
                   <Login baseURL={baseURL} setauth={setauth}/>
                 )

              } />

              <Route path="/handover_user/:email/:otp" element={
                <HandOver baseURL={baseURL}/>
              } />

              <Route path="/liveCam" element={
                <LiveCam />
              } />

            </Routes>
            </div>

      </div>
    </Router>
    </>
  );
}


export default App;
