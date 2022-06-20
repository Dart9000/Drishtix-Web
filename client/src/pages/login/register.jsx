import React, {useState, useEffect} from 'react'
import axios from "axios";
import styles from "./login.module.css";

const Register = ({baseURL}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp,setotp] =useState();

  const register = () => {
    axios.post(`${baseURL}/register`, {name,email}, {validateStatus: false, withCredentials: true}).then((response) => {
        if(response.status === 201){
          console.log("User registered");
          window.location="/";
        }
        else{
          console.log(response);
          console.log("register could not be done check if you have already been registered ");
        }
      });
  }

  return (
    <>
{/*  */}
    <div className={`${styles.body}`}>
    <h1 >Register page</h1>
    <div className={`${styles.form}`}>
      
    <div class={`${styles.row}`}>
    <label for="Name">Name</label>
    <input type="text" placeholder="Name" onChange={(e) => {
        setName(e.target.value);
      }} />
  </div>

      <div class={`${styles.row}`}>
    <label for="email">Email</label>
    <input type="text" placeholder="Email" onChange={(e) => {
        setEmail(e.target.value);
      }} />

  </div>
  <button onClick={register}>Register</button>
  </div>
  
  

    </div>
    </>
    
  )
}

export default Register;
