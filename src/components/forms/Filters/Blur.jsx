import { useState, useEffect } from "react";



export default function Blur({handleFunc, save}){

    const [intensity, setIntensity] = useState("5");
    const [isDragging, setDragging] = useState(false);



    function updateIntensity(e){
        if (e != null){
            setIntensity(e.target.value);
            handleFunc(e.target.value);
        }
        else{
            handleFunc(intensity);
        }
    }


    useEffect(()=>{
            if (isDragging) return;
    
            const timeout = setTimeout(()=>{
                updateIntensity(null);
            }, 500);
    
            return ()=> clearTimeout(timeout);
    
        }, [intensity]);




    function Save(e){
        e.preventDefault();
        save();
    }

    return <form>
        <div className="formElement">
            <label htmlFor="intensity">Intensity</label>
            <input type="range" min="1" max="50" id="intensity" required value={intensity} onChange={updateIntensity} onMouseDown={()=> setDragging(true)} 
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