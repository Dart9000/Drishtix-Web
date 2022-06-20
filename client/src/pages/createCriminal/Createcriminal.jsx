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
      setencoded(response.data.encoding);
    });

    const data = new FormData()
    data.append('file', pic)
    data.append('name', name)
    data.append('crime', crime)
    data.append('reportStation', reportStation)
    data.append('encoding', encoded);
    console.log(data);
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
          console.log(response.data);
        } else {
          console.log(response);
          console.log("criminal not registered")
        }
      });

  };


  return (
    <div>

      <input type="text" placeholder="Name" onChange={(e) => {
        setName(e.target.value);
      }
      }
      />

      <input type="text"
        placeholder="crime"
        onChange={
          (e) => {
            setcrime(e.target.value);
          }
        }
        /> <input type="text"
        placeholder="report Station"
        onChange={
          (e) => {
            setReportStation(e.target.value);
          }
        }
      />

      <input type="file"
        placeholder="report Station"
        onChange={
          (e) => {
            setPic(e.target.files[0]);
          }
        }
      />

      < button onClick={
          submitHandler
        } > Add </button> </div>

        );
};

 export default Createcriminal;
