import React,{useCallback, useRef} from 'react'
import Webcam from 'react-webcam'
import "./camera.css"

const Camera = ({onCapture}) => {

    const webcamRef = useRef(null)

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        onCapture(imageSrc)
    },[webcamRef, onCapture])

  return (
    <>
    <div className="camera-container">
    <Webcam audio={false} ref={webcamRef} screenshotFormat='image/jpeg' />
    <button onClick={capture} className="screenshotButton">
      Hikaye Çek
    </button>
  </div>
    </>
  )
}

export default Camera