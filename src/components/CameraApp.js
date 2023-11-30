import React, { useState, useRef } from 'react';
import { Engine, Scene, ArcRotateCamera, HemisphericLight, StandardMaterial } from 'react-babylonjs';
import { Vector3, Color3 } from '@babylonjs/core';

const CameraApp = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [showImage, setShowImage] = useState(true);
  const fileInputRef = useRef(null);
  const cameraRef = useRef(null);

  const FileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageUrl(imageUrl);
    }
  };

  const Imageshow = () => {
    setShowImage((prev) => !prev);
  };

  const FixView = (scene) => {
    // Check if cameraRef.current is not null or undefined
    if (cameraRef.current && cameraRef.current.hostInstance ) {
      const camera = cameraRef.current.hostInstance;
      camera.alpha = Math.PI / 2;
      camera.beta = Math.PI / 2;
      camera.radius = 10;// Adjust as needed to fit the mesh inside the camera view
    }
  };
  
  return (
    <div className='container w-50 h-100'>
      <input type="file" accept="image/*" onChange={FileUpload} ref={fileInputRef} style={{ display: 'none' }} />
      <button onClick={() => fileInputRef.current.click()} className=' mb-4 mt-3  mx-2 ' style={{border:'none',borderRadius:'25%'}}>Upload Image</button>
      <button onClick={ Imageshow} className=' mb-4 mt-3 mx-2'  style={{border:'none',borderRadius:'25%'}}>{showImage ? 'Hide Image' : 'Show Image'}</button>
      <button onClick={FixView} className=' mb-4 mt-3   gap-2'  style={{border:'none',borderRadius:'25%'}}>Fix View</button>

      <Engine antialias adaptToDeviceRatio canvasId="babylonJS-canvas" onSceneMount={FixView}>
        <Scene clearColor={new Color3(0, 1, 0)}>
          <ArcRotateCamera
            name="camera"
            ref={cameraRef}
            alpha={-Math.PI / 2}
            beta={Math.PI / 2}
            radius={10}
            target={Vector3.Zero()}
            minZ={0.1}
          />
          <HemisphericLight name="light1" intensity={0.7} direction={Vector3.Up()} />
  
          {imageUrl && showImage && (
            <box name="uploadedImage" size={3} position={new Vector3(0, 3, 0)}>
              <StandardMaterial name="mat">
                <texture assignTo="diffuseTexture" url={imageUrl} hasAlpha={false} />
              </StandardMaterial>
            </box>
          )}
        </Scene>
      </Engine>
    </div>
  );
};

export default CameraApp;
