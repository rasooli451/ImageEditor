
import { useState, useEffect } from "react";



export default function Pixelate({handleFunc, save}){

    const [pixelSize, setPixelSize] = useState("10");
    const [isDragging, setDragging] = useState(false);



    function updateIntensity(e){
        if (e != null){
            setPixelSize(e.target.value);
            handleFunc(e.target.value);
        }
        else{
            handleFunc(pixelSize);
        }
    }


    useEffect(()=>{
            if (isDragging) return;
    
            const timeout = setTimeout(()=>{
                updateIntensity(null);
            }, 500);
    
            return ()=> clearTimeout(timeout);
    
        }, [pixelSize]);




    function Save(e){
        e.preventDefault();
        save();
    }

    return <form>
        <div className="formElement">
            <label htmlFor="intensity">Pixel Size</label>
            <input type="range" min="2" max="100" id="intensity" required value={pixelSize} onChange={updateIntensity} onMouseDown={()=> setDragging(true)} 
        onMouseUp={()=> {
            setDragging(false);
            updateIntensity(null)
        }} onTouchStart={()=> setDragging(false)} onTouchEnd={()=>{
            setDragging(false);
            updateIntensity(null);
        }}/>
        </div>
        <button onClick={Save}>Save</button>
    </form>
}