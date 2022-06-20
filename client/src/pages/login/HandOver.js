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
          if(response.status === 200){
            console.log("Done");
            window.location = "/";
          }else{
            console.log("Failed");
          }
        });
    }

    return (
        <div className="addCriCon">

          <h2>Fill Up the Details</h2>

          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => {
                setPassword(e.target.value);
            }}/>
          </div>

          <div className="form-group">
            <label>Whatsapp Number</label>
            <input type="number" className="form-control" placeholder="Enter number" onChange={(e) => {
                setWhatsappNo(e.target.value);
            }}/>
          </div>

          <div className="form-group">
            <label>Address</label>
            <input type="text" className="form-control" placeholder="Enter address" onChange={(e) => {
                setAddress(e.target.value);
            }}/>
          </div>
          <button onClick={handOver}>Submit</button>
        </div>
    )
}

export default HandOver;
