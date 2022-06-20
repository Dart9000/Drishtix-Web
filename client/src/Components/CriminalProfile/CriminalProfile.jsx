import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import styles from "./CriminalProfile.module.css"

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
    <div className='.body'>
    <div className={styles.heading}><h1>CriminalProfile</h1></div>
    <div className ={`${styles.card}`}>
        <img  className='avatar' alt="pic of criminal" src={`${profileImgURL}`}/>
       <div className ={`${styles.details}`}>
        
        </div>
        <div className={`${styles.card_body}`}> 
        <div> {name}</div>
        <div> Crime: {crime}</div>
        <div> Report Station : {reportStation}</div>
      </div>
            
            
        </div>
        
     </div>
        
   
  )
}

export default CriminalProfile
