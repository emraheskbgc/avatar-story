import React,{ useRef } from 'react'
import Webcam from 'react-webcam'


function CameraShot({ onCloseCamera, onCapture }) {
    const webcamRef = useRef(null)
    const handleCloseCamera = () => {
        onCloseCamera(); // Bu fonksiyonu ana bileşende çağırarak kamerayı kapat.
    };
    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc); // Fotoğrafı state içinde saklayın
    };

    
  return (
    <div style={{ position: 'relative' }}>
    <Webcam height={600} width={600} ref={webcamRef} />
    <button 
                onClick={capture} 
                style={{ 
                    position: 'absolute', 
                    top: '90%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10, 
                    padding: '15px', 
                    cursor: 'pointer', 
                    backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                    borderRadius: '50%', 
                    border: 'none' 
                }}
            >
                Fotoğraf Çek
            </button>
    <button 
        onClick={handleCloseCamera} 
        style={{ 
            position: 'absolute', 
            top: '10px', 
            right: '10px', 
            padding: '5px', 
            cursor: 'pointer', 
            backgroundColor: 'red', 
            color: 'white', 
            borderRadius: '50%' 
        }}
    >
        X
    </button>
</div>
  )
}

export default CameraShot