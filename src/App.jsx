import { useState } from 'react'
import './App.css'

import ImageComponent from './components/ImageComponent';
import Tools from './components/Tools';

function App() {


  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectable, setSelectable] = useState(false);


  function toggleForm(){
    setShowForm(!showForm);
  }

  function toggleSelectable(){
    setSelectable(!selectable);
  }

  function handleChange(e){
    setShowForm(!showForm);
    const selected = e.target.files[0];

    if (selected){
      setFile(selected);

      const previewURL = URL.createObjectURL(selected);
      setPreview(previewURL);
    }
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
    <ImageComponent image={preview} file={file} selectable={selectable} triggerSelect={toggleSelectable}/>
     </div>
  )
}

export default App;
