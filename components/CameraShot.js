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
    
    // Webcam'in boyutlarına uygun bir canvas oluştur
    const canvas = document.createElement('canvas');
    canvas.width = webcamRef.current.video.clientWidth;  // Webcam'in genişliği
    canvas.height = webcamRef.current.video.clientHeight;  // Webcam'in yüksekliği
    
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = imageSrc;
    
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Boyutları belirtin
      
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
  facingMode:"user",
  height: { min: 600, ideal: 1200, max: 1820 },
  width: { min: 480, ideal: 720, max: 1080 },

  
}
  return (
    <div className="relative border border-white">
      {capturedImage ? (
        <img src={capturedImage} alt="Captured"  style={{ maxWidth: '100%', maxHeight: '100%' }}   />
      ) : (
        <div className="camera-container">
        <Webcam  ref={webcamRef} videoConstraints={videoConstraints} mirrored={true}  />
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
