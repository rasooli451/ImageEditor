import { useState, useEffect } from "react";





export default function Tint({handleFunc, save}){



    const [color, setColor] = useState("#FF0000");
    const [Intensity, setIntensity] = useState("50");
    const [isDragging, setIsDragging] = useState(false);


    function updateState(e, callback, lastChanged){
        if (e == null){
            handleFunc(color, Number(Intensity) / 100);
        }
        else{
            callback(e.target.value);
            if (lastChanged == "color"){
                handleFunc(e.target.value, Number(Intensity) / 100);
            }
            else{
                handleFunc(color, Number(e.target.value) / 100);
            }
        }
    }


    useEffect(()=>{
            if (isDragging) return;
    
            const timeout = setTimeout(()=>{
                updateState(null, setColor, "");
            }, 500);
    
            return ()=> clearTimeout(timeout);
    
        }, [Intensity, color]);



    function Save(e){
        e.preventDefault();
        save();
    }


    return <form>
        <div className="formElement">
            <label htmlFor="color">Color</label>
            <input type="color" value={color} id="color" required onChange={(e)=> updateState(e, setColor, "color")} />
        </div>
        <div className="formElement">
            <label htmlFor="intensity">Intensity</label>
            <input type="range" min={0} max={100} value={Intensity} id="Intensity" required onChange={(e)=> updateState(e, setIntensity, "intensity")} onMouseDown={()=> setIsDragging(true)} onMouseUp={()=> {
            setIsDragging(false);
            updateState(null, setColor, "");
        }} onTouchStart={()=> setIsDragging(false)} onTouchEnd={()=>{
            setIsDragging(false);
            updateState(null, setColor, "");
        }}/>
        </div>
        <button type="button" onClick={Save}>Save</button>
    </form>
}