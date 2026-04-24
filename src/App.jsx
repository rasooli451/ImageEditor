import { useState , useEffect, useRef} from 'react'
import './App.css'

import ImageComponent from './components/ImageComponent';
import Tools from './components/Tools';
import Resize from './components/forms/Resize';
import Rotate from './components/forms/Rotate';
import Flip from './components/forms/Flip';
import Convert from './components/forms/Convert';
import Thumbnail from './components/forms/Thumbnail';
import BasicAdjustments from './components/forms/BasicAdjustments';
import Threshold from './components/forms/Threshold';
import Isolation from './components/forms/Isolation';
import Sepia from './components/forms/Sepia';
import Invert from './components/forms/Invert';
import Tint from './components/forms/Tint';
import Gamma from './components/forms/Gamma';
function App() {


  const [file, setFile] = useState(null);
  const [tempFile, setTempFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectable, setSelectable] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);
  const [FormComponent, setFormComponent] = useState(null);
  const [colorAjustments, setColorAdjustments] = useState({brightness: "100", contrast: "100", grayscale: "0"});
  const [handler, setHandler] = useState(null);
  const fileRef = useRef(null);

  const Components = {
    Resize, Rotate,Flip,Convert, Thumbnail, BasicAdjustments,Threshold, Isolation, Sepia, Invert, Tint, Gamma
  };





  function updateAdjustments(adjustments){
    setColorAdjustments(adjustments);
  }






  const functions = {
    Resize : (width, height, aspectRatio)=> applyResizing(width, height, aspectRatio),
    Rotate : (angle)=> applyRotatation(angle),
    Flip : (direction)=> applyFlip(direction),
    Convert: (target)=> ConvertFile(target),
    Thumbnail : (width, height, crop)=> GenerateThumbnail(width, height, crop),
    BasicAdjustments: (adjustments) => applyBasicAdjustments(adjustments),
    Threshold: (threshold)=> applyThreshold(threshold),
    Isolation: (colorChannel)=> applyIsolation(colorChannel),
    Sepia : () => applySepia(),
    Invert : () => applyInvertion(),
    Tint: (color, Intensity) => applyTint(color, Intensity),
    Gamma: (gamma) => applyGamma(gamma)
  };


  useEffect(() => {
  return () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };
}, [preview]);

  useEffect(()=>{
    fileRef.current = file;
  }, [file])

  function toggleForm(){
    setShowForm(!showForm);
  }


  function toggleOptions(identity){
    setMoreOptions(!moreOptions);
    setFormComponent(()=> Components[identity]);
    setHandler(()=> functions[identity]);
    setColorAdjustments({brightness: "100", contrast: "100", grayscale: "0"});
    if (file != null)
        revertPreview();
  }

  function toggleSelectable(){
    setSelectable(!selectable);
  }

  function handleChange(e){
    setShowForm(!showForm);
    const selected = e.target.files[0];

    if (selected){
      setFile(selected);
      setFileName(selected.name);
      const previewURL = URL.createObjectURL(selected);
      setPreview(previewURL);
      setColorAdjustments({brightness: "100", contrast: "100", grayscale: "0"});
    }
  }

  function applyResizing(width, height, aspectRatio){
    const formData = new FormData();
    formData.append('file', file);
    formData.append('width', width);
    formData.append('height', height);
    formData.append('keep_aspect_ratio', aspectRatio ? 'true' : 'false');
    fetch('https://oyyi.xyz/api/image/resize', {
      method: 'POST',
      body: formData
    })
    .then(response => response.blob())
    .then(blob => {

      const newFile = blobToFile(blob, "editedimage.jpg");
      setFile(newFile);
      const url = URL.createObjectURL(newFile);
      setPreview(url);
    })
    .catch(error => console.error('Error:', error));
      }


    function crop(cropObject){
        const formData = new FormData();
        
        formData.append('file', file);
        formData.append('x', cropObject.x);
        formData.append('y', cropObject.y);
        formData.append('width', cropObject.width);
        formData.append('height', cropObject.height);
        

        fetch('https://oyyi.xyz/api/image/crop', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
          const newFile = blobToFile(blob, "editedimage.jpg");
          const url = URL.createObjectURL(newFile);
          
          setFile(newFile);
          setPreview(url);
         
        })
        .catch(error => console.error('Error:', error));
      }

      function blobToFile(blob, filename) {
        return new File([blob], filename, {
         type: blob.type,
        });
      }


      function applyRotatation(degree){
        const formData = new FormData();
        formData.append('file', fileRef.current);
        formData.append('angle', degree);
        formData.append('expand', 'true');
        formData.append('background_color', 'white');
        console.log("called");
        console.log(preview);
        fetch('https://oyyi.xyz/api/image/rotate', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
          const newFile = blobToFile(blob, "editedimage.jpg");
          const url = URL.createObjectURL(newFile);
          
          setFile(newFile);
          setPreview(url);
        })
        .catch(error => console.error('Error:', error));
      }


      function fileToImage(file) {
        return new Promise((resolve) => {
          const img = new Image();
          const url = URL.createObjectURL(file);

          img.onload = () => {
            URL.revokeObjectURL(url); 
            resolve(img);
          };

          img.src = url;
        });
      }
      function applyFlip(direction){
        const formData = new FormData();
        formData.append('file', fileRef.current);
        formData.append('mode', direction);

        fetch('https://oyyi.xyz/api/image/flip', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
          const newFile = blobToFile(blob, "editedimage.jpg");
          const url = URL.createObjectURL(newFile);
          
          setFile(newFile);
          setPreview(url);
        })
        .catch(error => console.error('Error:', error));
      }

      function ConvertFile(target){
        const formData = new FormData();
        formData.append('file', fileRef.current);
        formData.append('target_format', target);

        fetch('https://oyyi.xyz/api/image/convert', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
          const newFile = blobToFile(blob, "editedimage.jpg");
          const url = URL.createObjectURL(newFile);
          const a = document.createElement('a');
          a.href = url;
          a.setAttribute("download", "");
          a.click();

          URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error:', error));
      }


      function Compress(){
        const formData = new FormData();
        formData.append('file', fileRef.current);
        formData.append('quality', '75');

        fetch('https://oyyi.xyz/api/image/compress', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
          const newFile = blobToFile(blob, "editedimage.jpg");
          const url = URL.createObjectURL(newFile);
          const a = document.createElement('a');
          a.href = url;
          a.setAttribute("download", fileName);
          a.click();

          URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error:', error));

      }



      function GenerateThumbnail(width, height, crop){

        const formData = new FormData();
        formData.append('file', fileRef.current);
        formData.append('width', width);
        formData.append('height', height);
        formData.append('crop', crop);

        fetch('https://oyyi.xyz/api/image/thumbnail', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.setAttribute("download", fileName);
          a.click();
          URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error:', error));

      }


      function removeBackground(){
        const formData = new FormData();
        formData.append('file', fileRef.current);

        fetch('https://oyyi.xyz/api/image/remove-bg', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.setAttribute("download", fileName);
          a.click();

          URL.revokeObjectURL(url);
        })
        .catch(error => console.error('Error:', error));
              }

      function applyToCanvas(img, adjustments){
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        ctx.filter = [
        `brightness(${adjustments.brightness}%)`,
        `contrast(${adjustments.contrast}%)`,
        `grayscale(${adjustments.grayscale}%)`
      ].join(" ");
        ctx.drawImage(img, 0, 0);

        return new Promise((resolve)=> {
          canvas.toBlob((blob)=> {
            resolve(new File([blob],fileName, {type: blob.type} ))
          })
        })
      };


      async function applyBasicAdjustments(adjustments){
        const img = await fileToImage(file);
        const newFile = await applyToCanvas(img, adjustments);

        setFile(newFile);
        setPreview(URL.createObjectURL(newFile));
        setColorAdjustments({brightness: "100", contrast: "100", grayscale: "0"});
      }


      function applyThreshold(threshold){
        const formData = new FormData();
        formData.append('file', fileRef.current);
        formData.append('threshold_value', threshold);

        fetch('https://oyyi.xyz/api/image/threshold', {
            method: 'POST',
            body: formData
          })
          .then(response => response.blob())
          .then(blob => {
          const newFile = blobToFile(blob, "editedimage.jpg");
          const url = URL.createObjectURL(newFile);
          
          setTempFile(newFile);
          setPreview(url);
          })
          .catch(error => console.error('Error:', error));
      }


      function applyIsolation(colorChannel){
        if (colorChannel == 'D'){
              revertPreview();
            }
            else{
              const formData = new FormData();
              formData.append('file', fileRef.current);
              formData.append('channel', colorChannel);

            fetch('https://oyyi.xyz/api/image/isolate-channel', {
              method: 'POST',
              body: formData
            })
            .then(response => response.blob())
            .then(blob => {
             const newFile = blobToFile(blob, "editedimage.jpg");
             const url = URL.createObjectURL(newFile);
          
             setTempFile(newFile);
             setPreview(url);
            })
            .catch(error => console.error('Error:', error));
            }
      }

      function applySepia(){
        const formData = new FormData();
        formData.append('file', fileRef.current);

      fetch('https://oyyi.xyz/api/image/sepia', {
        method: 'POST',
        body: formData
      })
      .then(response => response.blob())
      .then(blob => {
        const newFile = blobToFile(blob, "editedimage.jpg");
        const url = URL.createObjectURL(newFile);
    
        setTempFile(newFile);
        setPreview(url);
      })
      .catch(error => console.error('Error:', error));
      
      }



      function applyTint(color, Intensity){
        const formData = new FormData();
        formData.append('file', fileRef.current);
        formData.append('color', color); 
        formData.append('intensity', Intensity);

        fetch('https://oyyi.xyz/api/image/tint', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
           const newFile = blobToFile(blob, "editedimage.jpg");
           const url = URL.createObjectURL(newFile);
    
           setTempFile(newFile);
           setPreview(url);
        })
        .catch(error => console.error('Error:', error));

      }

      function revertPreview(){
        const url = URL.createObjectURL(file);
        setPreview(url);
      }

      function applyInvertion(){
        const formData = new FormData();
        formData.append('file', fileRef.current);

      fetch('https://oyyi.xyz/api/image/invert', {
        method: 'POST',
        body: formData
      })
      .then(response => response.blob())
      .then(blob => {
        const newFile = blobToFile(blob, "editedimage.jpg");
        const url = URL.createObjectURL(newFile);
    
        setTempFile(newFile);
        setPreview(url);
      })
      .catch(error => console.error('Error:', error));
      }


      function applyGamma(gamma){
        const formData = new FormData();
        formData.append('file', fileRef.current);
        formData.append('gamma', gamma);

        fetch('https://oyyi.xyz/api/image/gamma-correct', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
         const newFile = blobToFile(blob, "editedimage.jpg");
         const url = URL.createObjectURL(newFile);
    
         setTempFile(newFile);
         setPreview(url);
        })
        .catch(error => console.error('Error:', error));
      }


      function saveThreshold(){
        setFile(tempFile);
        setTempFile(null);
        const url = URL.createObjectURL(tempFile);
        setPreview(url);
      }

  return (
   <div className='content'>
    <h1>Image Editor</h1>
    <button className='uploadbtn' type='button' onClick={toggleForm}>Upload Image</button>
    
    {showForm ?  
    <form action="">
      <div className='formElement'>
        <label htmlFor="file">Choose a file: </label>
        <input type='file' id='file' name='file' required onChange={handleChange}/>
      </div>
    </form>
    :null}
    <ImageComponent image={preview} file={file} selectable={selectable} triggerSelect={toggleSelectable} formSelection={(identity)=>toggleOptions(identity)} cropFunc={(cropObj)=> crop(cropObj)} compressFunc={Compress} BGremoval={removeBackground} adjustments={colorAjustments}/>
      {moreOptions ? <FormComponent handleFunc={handler} adjustments={colorAjustments} setAdjustments={updateAdjustments} revert={revertPreview} save={saveThreshold}/> : null}
        {preview == null ? null : <a href={preview} download={fileName} target="_self">Download</a>}
     </div>
  )
}

export default App;


