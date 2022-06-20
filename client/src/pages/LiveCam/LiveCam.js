import React, { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";

function LiveCom() {
  const FACING_MODE_USER = "user";
  const FACING_MODE_ENVIRONMENT = "environment";

  const webcamRef = useRef(null);
  const [image, setImage] = useState("");

  const videoConstraints = {
    width: 220,
    height: 200
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);


  useEffect(() => {
    capture();
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
