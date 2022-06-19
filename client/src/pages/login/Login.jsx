import React, {useState, useEffect} from 'react'
import axios from "axios";


const Login = ({baseURL, setauth}) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    axios.post(`${baseURL}/login`, {email, password}, {validateStatus: false, withCredentials: true}).then((response) => {
        if(response.status === 200 && response.data.success){
          console.log("User Logedin");
          console.log(response.data);
          setauth(true);
        }else{
          console.log("Login Failed");
        }
      });
  }

  return (
    <div>
      <h1>login page</h1>

      <input type="text" placeholder="Email" onChange={(e) => {
        setEmail(e.target.value);
      }}/>
      <input type="password" placeholder="password" onChange={(e) => {
        setPassword(e.target.value);
      }}/>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login
