import { useState , useEffect, useRef} from 'react'
import './App.css'

import ImageComponent from './components/ImageComponent';
import Tools from './components/Tools';
import Resize from './components/forms/Basics/Resize.jsx';
import Rotate from './components/forms/Basics/Rotate.jsx';
import Flip from './components/forms/Basics/Flip.jsx';
import Convert from './components/forms/Basics/Convert.jsx';
import Thumbnail from './components/forms/Basics/Thumbnail.jsx';
import BasicAdjustments from './components/forms/ColorManipulation/BasicAdjustments';
import Threshold from './components/forms/ColorManipulation/Threshold';
import Isolation from './components/forms/ColorManipulation/Isolation';
import Sepia from './components/forms/ColorManipulation/Sepia';
import Invert from './components/forms/ColorManipulation/Invert';
import Tint from './components/forms/ColorManipulation/Tint';
import Gamma from './components/forms/ColorManipulation/Gamma';
import Posterize from './components/forms/ColorManipulation/Posterize';
import AdaptiveContrast from './components/forms/ColorManipulation/AdaptiveContrast.jsx';
import Blur from './components/forms/Filters/Blur.jsx';
import Sharpen from './components/forms/Filters/Sharpen.jsx';
import Cartoon from './components/forms/Filters/Cartoon.jsx';
import Emboss from './components/forms/Filters/Emboss.jsx';
import Sketch from './components/forms/Filters/Sketch.jsx';
import Halftone from './components/forms/Filters/Halftone.jsx';
import Pixelate from './components/forms/Filters/Pixelate.jsx';
import Denoise from './components/forms/Filters/Denoise.jsx';
import ColorAdjustments from './components/ColorAdjustments.jsx';
import FiltersAndEffects from './components/FiltersAndEffects.jsx';

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
  const [adjustments, setAdjustments] = useState("Tools");
  const fileRef = useRef(null);

  const Components = {
    Resize, Rotate,Flip,Convert, Thumbnail, BasicAdjustments,Threshold, Isolation, Sepia, Invert, Tint, Gamma, Posterize, AdaptiveContrast,Blur, Sharpen, Cartoon, Emboss, Sketch, Halftone,Pixelate,Denoise, Tools, ColorAdjustments, FiltersAndEffects
  };

  const ButtonsComponent = Components[adjustments];





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
    Gamma: (gamma) => applyGamma(gamma),
    Posterize: (level) => PosterizeImage(level),
    AdaptiveContrast: (clipLimit, gridSize)=> applyAdaptiveContrast(clipLimit, gridSize),
    Blur: (intensity)=> applyBlur(intensity),
    Sharpen: ()=>sharpenImage(),
    Cartoon: (edgeSize, numOfColors)=> cartoonizeImage(edgeSize, numOfColors),
    Emboss: ()=> applyEmboss(),
    Sketch: (style, intensity)=> Sketchify(style, intensity),
    Halftone: (bgColor, dotSize)=> applyHalftone(bgColor, dotSize),
    Pixelate: (pixel_size)=> pixelateImage(pixel_size),
    Denoise : (strength) => denoiseImage(strength)
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
    setTempFile(null);
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
         updateView(blob);
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
             updateView(blob);
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
        updateView(blob);
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
           updateView(blob);
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
        updateView(blob);
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
         updateView(blob);
        })
        .catch(error => console.error('Error:', error));
      }


      function saveThreshold(){
        if (tempFile != null){
          setFile(tempFile);
          setTempFile(null);
          const url = URL.createObjectURL(tempFile);
          setPreview(url);
        }
      }

      function PosterizeImage(level){
        const formData = new FormData();
        formData.append('file', fileRef.current);
        formData.append('levels', level);

        fetch('https://oyyi.xyz/api/image/posterize', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
          updateView(blob);
        })
        .catch(error => console.error('Error:', error));
      }

      function applyAdaptiveContrast(clipLimit, gridSize){
        const formData = new FormData();
        formData.append('file', fileRef.current);
        formData.append('clip_limit', clipLimit);
        formData.append('tile_grid_size', gridSize);

        fetch('https://oyyi.xyz/api/image/adaptive-contrast', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
          updateView(blob);
        })
        .catch(error => console.error('Error:', error));

      }

      function applyBlur(intensity){
        const formData = new FormData();
        formData.append('file', fileRef.current);
        formData.append('intensity', intensity);

        fetch('https://oyyi.xyz/api/image/blur', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
          updateView(blob);
        })
        .catch(error => console.error('Error:', error));
      }

      function sharpenImage(){
        const formData = new FormData();
        formData.append('file', fileRef.current);

        fetch('https://oyyi.xyz/api/image/sharpen', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
         updateView(blob);
        })
        .catch(error => console.error('Error:', error));
      }

      function cartoonizeImage(edgeSize, numOfColors){
        const formData = new FormData();
        formData.append('file', fileRef.current);
        formData.append('edge_size', edgeSize);
        formData.append('num_colors', numOfColors);

        fetch('https://oyyi.xyz/api/image/cartoon', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
          updateView(blob);
        })
      .catch(error => console.error('Error:', error));
      }

      function applyEmboss(){
        const formData = new FormData();
        formData.append('file', fileRef.current);

        fetch('https://oyyi.xyz/api/image/emboss', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
          updateView(blob);
        })
        .catch(error => console.error('Error:', error));

      }

      function Sketchify(style, intensity){
        const formData = new FormData();
        formData.append('file', fileRef.current);
        formData.append('style', style);
        formData.append('intensity', intensity);

        fetch('https://oyyi.xyz/api/image/sketch', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
         updateView(blob);
          
          
        })
        .catch(error => console.error('Error:', error));
      }


      function applyHalftone(bgColor, dotSize){
        const formData = new FormData();
        formData.append('file', fileRef.current);
        formData.append('dot_size', dotSize);
        formData.append('background_color', bgColor);

        fetch('https://oyyi.xyz/api/image/halftone', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
          updateView(blob);
        })
        .catch(error => console.error('Error:', error));
      }


      function pixelateImage(pixel_size){
        const formData = new FormData();
        formData.append('file', fileRef.current);
        formData.append('pixel_size', pixel_size);

        fetch('https://oyyi.xyz/api/image/pixelate', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
          updateView(blob);
       
        })
        .catch(error => console.error('Error:', error));
              }

      function denoiseImage(strength){
        const formData = new FormData();
        formData.append('file', fileRef.current);
        formData.append('strength', strength);

        fetch('https://oyyi.xyz/api/image/denoise', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
          updateView(blob);
        })
        .catch(error => console.error('Error:', error));
      }


      function updateView(blob){
        const newFile = blobToFile(blob, "editedimage.jpg");
        const url = URL.createObjectURL(newFile);
    
        setTempFile(newFile);
        setPreview(url);  

      }

      function updateSettings(e){
        setAdjustments(e.target.value);
      }

    

  return (
   <div className='content'>
    <div className='inputImageSect'>
      <div className='inputBox'>
        <h1>Image Editor</h1>
        <button className='uploadbtn' type='button' onClick={toggleForm}>Upload Image</button>
        {showForm ?  
        <form>
          <div className='formElement'>
            <label htmlFor="file">Choose a file: </label>
            <input type='file' id='file' name='file' required onChange={handleChange}/>
          </div>
        </form>
        :null}
      </div>
      <div className='settingsInput'>
        <label htmlFor="settings">Choose Operation Type</label>
        <select name="settings" id="settings" value={adjustments} onChange={updateSettings}>
           <option value="Tools">Basic Operations</option>
           <option value="ColorAdjustments">Color Adjustments</option>
           <option value="FiltersAndEffects">Filters and Effects</option>
        </select>
      </div>
      <div className='allButtons'>
        <ButtonsComponent switchSelect={toggleSelectable} unimportantfunc={(identity)=> toggleOptions(identity)} Compress={Compress} removeBG={removeBackground} />
      </div>  
    </div>
    <ImageComponent image={preview}  selectable={selectable} triggerSelect={toggleSelectable}  cropFunc={(cropObj)=> crop(cropObj)}   adjustments={colorAjustments}/>
      {moreOptions ? <FormComponent handleFunc={handler} adjustments={colorAjustments} setAdjustments={updateAdjustments} revert={revertPreview} save={saveThreshold}/> : null}
        {preview == null ? null : <a href={preview} download={fileName} target="_self">Download</a>}
     </div>
  )
}

export default App;


