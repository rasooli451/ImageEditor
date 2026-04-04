import { useState , useEffect} from 'react'
import './App.css'

import ImageComponent from './components/ImageComponent';
import Tools from './components/Tools';
import Resize from './components/forms/Resize';

function App() {


  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectable, setSelectable] = useState(false);
  const [moreOptions, setMoreOptions] = useState(false);
  const [FormComponent, setFormComponent] = useState(null);

  const Components = {
    Resize : Resize
  };


  useEffect(() => {
  return () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };
}, [preview]);

  function toggleForm(){
    setShowForm(!showForm);
  }


  function toggleOptions(identity){
    setMoreOptions(!moreOptions);
    setFormComponent(()=> Components[identity]);
  }

  function toggleSelectable(){
    setSelectable(!selectable);
  }

  function handleChange(e){
    setShowForm(!showForm);
    const selected = e.target.files[0];

    if (selected){
      setFile(selected);
      console.log(selected);

      const previewURL = URL.createObjectURL(selected);
      setPreview(previewURL);
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
      // Create a URL for the blob

      const newFile = blobToFile(blob, "editedimage.jpg");
      setFile(newFile);
      const url = URL.createObjectURL(blob);

      console.log(blob);
      setPreview(url);

      // Create a link to download the image
      /*const a = document.createElement('a');
      a.href = url;
      a.download = 'resized.jpg';
      a.click();

      // Clean up by revoking the URL
      URL.revokeObjectURL(url);*/
    })
    .catch(error => console.error('Error:', error));
      }


    function crop(cropObject){
        console.log(cropObject);
        const formData = new FormData();
        
        formData.append('file', file);
        formData.append('x', String(cropObject.x));
        formData.append('y', String(cropObject.y));
        formData.append('width', String(cropObject.width));
        formData.append('height', String(cropObject.height));

        fetch('https://oyyi.xyz/api/image/crop', {
          method: 'POST',
          body: formData
        })
        .then(response => response.blob())
        .then(blob => {
          // Create a URL for the blob
          const url = URL.createObjectURL(blob);
          const newFile = blobToFile(blob, "editedimage.jpg");
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
    <ImageComponent image={preview} file={file} selectable={selectable} triggerSelect={toggleSelectable} formSelection={(identity)=>toggleOptions(identity)} cropFunc={(cropObj)=> crop(cropObj)}/>
      {moreOptions ? <FormComponent resizeFunc={(width, height, aspectRatio)=> applyResizing(width, height, aspectRatio)}/> : null}
        {preview == null ? null : <a href={preview} download="EditedImage.jpg" target="_self">Download</a>}
     </div>
  )
}

export default App;
