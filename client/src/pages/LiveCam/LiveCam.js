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

    var byteString = atob(imageSrc.split(',')[1]);

    var mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];

    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
        _ia[i] = byteString.charCodeAt(i);
    }

    var dataView = new DataView(arrayBuffer);
    var blob = new Blob([dataView], { type: mimeString });

    const exData = new FormData();
    exData.append("file", blob);
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
    setInterval(capture, 30000);
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
