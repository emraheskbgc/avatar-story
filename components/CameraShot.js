"use client";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

function CameraShot({ onCloseCamera, onCapture }) {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null); // Çekilen fotoğrafın URL'si için state
  const handleCloseCamera = () => {
    onCloseCamera(); // Bu fonksiyonu ana bileşende çağırarak kamerayı kapat.
  };
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc); // Fotoğrafı state içinde sakla
  };

  const handleBackToCamera = () => {
    setCapturedImage(null); // Kameraya geri dön
  };

  const handleShareToStory = () => {
    if (capturedImage) {
      onCapture(capturedImage); // Ana bileşende bu fotoğrafı kullanarak hikayeye ekle
      handleCloseCamera(); // Kamerayı kapat
    }
  };

  return (
    <div className="relative">
      {capturedImage ? (
        <img src={capturedImage} alt="Captured" className="w-[100%]"/>
      ) : (
        <Webcam height={500} width={500} ref={webcamRef} />
      )}

      {!capturedImage && (
        <button
          className="absolute bottom-[30px] left-[50%]  transform translate-x-[-50%] -translate-y-[-50%] z-10 p-[15px] cursor-pointer bg-gray-200 rounded-full  border-none"
          onClick={capture}
        >
         
        </button>
      )}

      <button
        onClick={handleCloseCamera}
        className="absolute top-[10px] right-[10px] px-[5px] cursor-pointer bg-red-500 text-white rounded-full"
      >
        x
      </button>

      {capturedImage && (
        <>
          <button
            onClick={handleBackToCamera}
            className="absolute bottom-[10px] left-[20px] cursor-pointer text-gray-400 bg-slate-800 p-3 rounded-full"
           
          >
            Back to camera
          </button>
          <button
            onClick={handleShareToStory}
            className="absolute bottom-[10px] right-[20px] cursor-pointer text-gray-400 bg-slate-800 p-3 rounded-full"
            
          >
           Share to story
          </button>
        </>
      )}
    </div>
  );
}

export default CameraShot;
