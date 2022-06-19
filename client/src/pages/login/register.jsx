import React, {useState, useEffect} from 'react'
import axios from "axios";


const Register = ({baseURL}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp,setotp] =useState();

  const register = () => {
    axios.post(`${baseURL}/register`, {name,email}, {validateStatus: false, withCredentials: true}).then((response) => {
        if(response.status === 201){
          console.log("User registered");
          console.log(response.data);
        }
        else{
          console.log("register could not be done check if you have already been registered ");
        }
      });
  }

  return (
    <div>
      <h1>Register page</h1>
      <input type="text" placeholder="Name" onChange={(e) => {
        setName(e.target.value);
      }}/>

      <input type="text" placeholder="Email" onChange={(e) => {
        setEmail(e.target.value);
      }}/>

      <button onClick={register}>register</button>
    </div>
  )
}

export default Register;
