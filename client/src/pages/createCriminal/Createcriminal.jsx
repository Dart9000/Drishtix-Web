import React from "react";
import { useState } from "react";
import axios from "axios";


const Createcriminal = ({baseURL}) => {
  const [name, setName] = useState();
  const [crime, setcrime] = useState();
  const [report_station, setreport_station] = useState();
  const [pic, setPic] = useState();
  const [encoded,setencoded]=useState([]);

  const submitHandler = () => {
    const data = new FormData();
    data.append("file", pic);
    axios.post('https://drishtix-api.herokuapp.com/encode', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      console.log(response);
    });


    //  axios.post(
    //     `${baseURL}/criminal/create`,
    //     { name, crime, report_station,pic},
    //     { validateStatus: false, withCredentials: true }
    //   )
    //   .then((response) => {
    //     if(response.status === 201){
    //         console.log("criminal data  registered");
    //         console.log(response.data);
    //       }
    //       else{
    //         console.log("criminal not registered")
    //       }
    //   });

  };


  return (
    <div>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="crime"
        onChange={(e) => {
          setcrime(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="report Station"
        onChange={(e) => {
          setreport_station(e.target.value);
        }}
      />

      <input
        type="file"
        placeholder="report Station"
        onChange={(e) => {
          setPic(e.target.files[0]);
        }}
      />

      <button onClick={submitHandler}>register</button>
    </div>
  );
};

export default Createcriminal;
