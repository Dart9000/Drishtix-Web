import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";


function HandOver({baseURL}) {
    const { otp, email } = useParams();

    const [password, setPassword] = useState("");
    const [whatsappNo, setWhatsappNo] = useState("");
    const [address, setAddress] = useState("");

    const handOver = () => {
      axios.post(`${baseURL}/handover`, {email, otp, password, whatsappNo, address}, {validateStatus: false, withCredentials: true}).then((response) => {
          if(response.status === 200 && response.data.success){
            console.log("Done");
            window.location("/");
          }else{
            console.log("Failed");
          }
        });
    }

    return (
        <div>
          <input type="password" placeholder="Password" onChange={(e) => {
            setPassword(e.target.value);
          }} />
          <input type="number" placeholder="Whatsapp Number" onChange={(e) => {
            setWhatsappNo(e.target.value);
          }} />
          <input type="text" placeholder="Address" onChange={(e) => {
            setAddress(e.target.value);
          }} />
          <button onClick={handOver}>Submit</button>
        </div>
    )
}

export default HandOver;
