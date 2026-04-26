

import { useState,useEffect } from "react";


export default function Sketch({handleFunc, save}){

    const [style, setStyle] = useState("pencil");
    const [intensity, setIntensity] = useState("50");
    const [isDragging, setDragging] = useState(false);

     








    function Save(e){
        e.preventDefault();
        save();
    }


    function updateSketch(e, callback, lastChanged){
        if (e!= null){
            callback(e.target.value);
        }

        if (lastChanged == "style"){
            handleFunc(e.target.value, Number(intensity) / 100)
        }
        else if(lastChanged == "intensity"){
            handleFunc(style, Number(e.target.value)/100)
        }
        else{
            handleFunc(style, Number(intensity) / 100);
        }
    }

    useEffect(()=>{
        if (isDragging) return;
        
        const timeout = setTimeout(()=>{
            updateSketch(null, null, null);
        }, 500);

        return ()=> clearTimeout(timeout);
    
        }, [style, intensity]);

    return <form>
        <div className="formElement">
            <label htmlFor="style">Style</label>
            <select name="style" id="style" value={style} onChange={(e)=> updateSketch(e, setStyle, "style")}>
                <option value="pencil">Pencil</option>
                <option value="pen">Pen</option>
                <option value="charcoal">Charcoal</option>
            </select>
        </div>
        <div className="formElement">
            <label htmlFor="intensity">Intensity</label>
            <input type="range" min="1" max="100" required id="intensity" value={intensity} onMouseDown={()=> setDragging(true)} 
        onMouseUp={()=> {
            setDragging(false);
            updateSketch(null, null, null)
        }} onTouchStart={()=> setDragging(false)} onTouchEnd={()=>{
            setDragging(false);
            updateSketch(null, null, null);
        }} onChange={(e)=> updateSketch(e, setIntensity, "intensity")}/>
        </div>

        <button onClick={Save}>Save</button>
    </form>
}