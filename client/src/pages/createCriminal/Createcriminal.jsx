import React from "react";
import {
  useState
} from "react";
import axios from "axios";


const Createcriminal = ({
  baseURL
}) => {
  const [name, setName] = useState();
  const [crime, setcrime] = useState();
  const [reportStation, setReportStation] = useState();
  const [pic, setPic] = useState();
  const [encoded, setencoded] = useState([]);

  const submitHandler = async () => {
    const exData = new FormData();
    exData.append("file", pic);
    await axios.post('https://drishtix-api.herokuapp.com/encode', exData, {
      validateStatus: false,
      withCredentials: true
    },{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      console.log(response.data.encoding);
      setencoded(response.data.encoding);
    });


    const data = new FormData()
    data.append('file', pic)
    data.append('name', name)
    data.append('crime', crime)
    data.append('reportStation', reportStation)
    data.append('encoding', encoded);
    await axios.post(
      `${baseURL}/criminal/create`, data, {
      validateStatus: false,
      withCredentials: true
    },
      { headers: { "Content-Type": "multipart/form-data" } },
    )
      .then((response) => {
        if (response.status === 201) {
          console.log("criminal data registered");
          exData.append("id",response.data._id);
        } else {
          console.log(response.data);
          console.log("criminal not registered");
          window.location = "/"
        }
      });


  };


  return (
    <div className="addCriCon">
      <h2>Add a Criminal</h2>
      <div className="form-group">
        <label>Name</label>
        <input type="text" className="form-control" placeholder="Enter Name" onChange={(e) => {
            setName(e.target.value);
        }}/>
      </div>


      <div className="form-group">
        <label>Crime</label>
        <input type="text" className="form-control" placeholder="Enter crime" onChange={(e) => {
            setcrime(e.target.value);
        }}/>
      </div>

      <div className="form-group">
        <label>Report Station</label>
        <input type="text" className="form-control" placeholder="Enter Report Station" onChange={(e) => {
            setReportStation(e.target.value);
        }}/>
      </div>

      <div className="form-group">
        <label>Criminal Photo</label>
        <input type="file" className="form-control" placeholder="Enter email" onChange={(e) => {
            setPic(e.target.files[0]);
        }}/>
      </div>

      < button onClick={
          submitHandler
        } > Add </button> </div>

        );
};

 export default Createcriminal;
