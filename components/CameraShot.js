"use client";
import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

function CameraShot({ onCloseCamera, onCapture, onShareToStory }) {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null); // Çekilen fotoğrafın URL'si için state
  const handleCloseCamera = () => {
    onCloseCamera(); // Bu fonksiyonu ana bileşende çağırarak kamerayı kapat.
  };
  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();

    // Kare fotoğrafı almak için bir canvas oluştur
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = Math.min(window.innerWidth, window.innerHeight); // Ekranın en küçük boyutunu al (kare olacak şekilde)

    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      // Kare fotoğrafı canvas'a çiz
      const offsetX = (canvas.width - img.width) / 2;
      const offsetY = (canvas.height - img.height) / 2;
      ctx.drawImage(img, offsetX, offsetY);

      // Canvas'dan resmi çek ve setCapturedImage ile sakla
      setCapturedImage(canvas.toDataURL('image/jpeg'));
    };
  };
  const handleBackToCamera = () => {
    setCapturedImage(null); // Kameraya geri dön
  };

  const handleShareToStory = () => {
    if (capturedImage) {
      onCapture(capturedImage); // Direkt olarak çekilen fotoğrafı ana bileşende kullanarak hikayeye ekle
      handleCloseCamera(); // Kamerayı kapat
    }
  };
  
const videoConstraints = {
  facingMode:"user"
  
}
  return (
    <div className="relative">
      {capturedImage ? (
        <img src={capturedImage} alt="Captured" className="w-[100%] h-[100%] "/>
      ) : (
        <div className="camera-container">
        <Webcam className="camera-style" ref={webcamRef} videoConstraints={videoConstraints} mirrored={true}  />
      </div>
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
