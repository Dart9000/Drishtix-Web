import React, { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const cctv = {
  phone: "8949190774",
  address: "Bhilwara"
}

function LiveCom() {

  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 420,
    height: 400
  };

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    var byteString = atob(imageSrc.split(',')[1]);

    var mimeString = imageSrc.split(',')[0].split(':')[1].split(';')[0];

    var arrayBuffer = new ArrayBuffer(byteString.length);
    var _ia = new Uint8Array(arrayBuffer);
    for (var i = 0; i < byteString.length; i++) {
        _ia[i] = byteString.charCodeAt(i);
    }

    var dataView = new DataView(arrayBuffer);
    var image = new Blob([dataView], { type: mimeString });

    const exData = new FormData();
    exData.append("file", image);
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
    <div className="cctvPage">
      <h1>Live CCTv Footage</h1>
      <Webcam
        audio={false}
        height={400}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={420}
        videoConstraints={videoConstraints}
      />

    </div>
  );
}

export default LiveCom
