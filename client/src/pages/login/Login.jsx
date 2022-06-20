import React, {useState, useEffect} from 'react'
import axios from "axios";
import styles from "./login.module.css";

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

  return (<div className={`${styles.body}`}>
    <h1 >login page</h1>
    <div className={`${styles.form}`}>
      

      <div class={`${styles.row}`}>
    <label for="email">Email</label>
    <input type="text" placeholder="Email" onChange={(e) => {
        setEmail(e.target.value);
      }} />
  </div>
  <div class={`${styles.row}`}>
    <label for="password">Password</label>
    <input type="password" placeholder="password" onChange={(e) => {
        setPassword(e.target.value);
      }} />
  </div>
  <button onClick={login}>Login</button>

    </div>
    </div>
  )
}

export default Login
