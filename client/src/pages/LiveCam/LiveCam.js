import React, { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const cctv = {
  phone: "8949190774",
  address: "Bhilwara"
}

function LiveCom() {
  const FACING_MODE_USER = "user";
  const FACING_MODE_ENVIRONMENT = "environment";

  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 220,
    height: 200
  };

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);

    const exData = new FormData();
    exData.append("file", imageSrc);
    await axios.post(`https://drishtix-api.herokuapp.com/search?Phone=${cctv.phone}&Address=${cctv.address}`, exData, {
      validateStatus: false,
      withCredentials: true
    },{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      console.log(response);
    });
  }, [webcamRef]);


  useEffect(() => {
    setInterval(capture, 5000);
  }, [])

  return (
    <>
      <Webcam
        audio={false}
        height={400}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={220}
        videoConstraints={videoConstraints}
      />

    </>
  );
}

export default LiveCom
