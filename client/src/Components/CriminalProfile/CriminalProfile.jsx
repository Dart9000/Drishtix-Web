import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";

const CriminalProfile = ( {baseURL}) => {

    const {id}=useParams();
    const [name,setName]=useState();
    const [crime,setcrime]=useState();
    const [reportStation,setreportStation]=useState();
    const [profileImgURL,setprofileImgURL]=useState();

    const fetchProfile= () => {
        axios.get(`${baseURL}/criminal/criminal_profile/${id}`, {validateStatus: false, withCredentials: true}).then((response) => {
            if(response.status === 200){
              console.log(response.data);
                  setName(response.data.name);
                 setcrime(response.data.crime);
                setreportStation(response.data.reportStation);
                setprofileImgURL(response.data.profileImgURL);

            }else{
              console.log("Failed");
            }
          });
      }

      useEffect(() => {
        fetchProfile();
      }, [])



  return (
    <div>
        <h1>CriminalProfile</h1>

        <div>
        <img alt="pic of criminal" src={`${profileImgURL}`}/>
        </div>

        <div>
            <div>Name</div> : <div>{name}</div>
        </div>
        <div>
            <div>reportStation</div> : <div>{reportStation}</div>
        </div>
        <div>
            <div>crime</div> : <div>{crime}</div>
        </div>

    </div>
  )
}

export default CriminalProfile