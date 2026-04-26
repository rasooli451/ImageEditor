import { useState,useEffect } from "react";





export default function Halftone({handleFunc, save}){

    const [bgColor, setBgColor] = useState("#FF0000");
    const [dotSize, setDotSize] = useState("5");
    const [isDragging, setDragging] = useState(false);





    function updateHalftone(e, callback, lastChanged){
        if (e != null){
            callback(e.target.value);
        }

        if (lastChanged == "bgcolor"){
            handleFunc(e.target.value, dotSize)
        }
        else if(lastChanged == "dotsize"){
            handleFunc(bgColor, e.target.value);
        }
        else{
            handleFunc(bgColor, dotSize);
        }

    }


    useEffect(()=>{
        if (isDragging) return;
        
        const timeout = setTimeout(()=>{
            updateHalftone(null, null, null);
        }, 500);

        return ()=> clearTimeout(timeout);

        }, [bgColor, dotSize]);



         
    function Save(e){
        e.preventDefault();
        save();
    }

    return <form>
        <div className="formElement">
            <label htmlFor="bgColor">Background Color</label>
            <input type="color" id="bgColor" value={bgColor} required onChange={(e)=> updateHalftone(e, setBgColor, "bgcolor")}/>
        </div>
        <div className="formElement">
            <label htmlFor="dotsize">Dot Size</label>
            <input type="range" min="2" max="20" value={dotSize} id="dotsize" required onMouseDown={()=> setDragging(true)} 
        onMouseUp={()=> {
            setDragging(false);
            updateHalftone(null, null, null)
        }} onTouchStart={()=> setDragging(false)} onTouchEnd={()=>{
            setDragging(false);
            updateHalftone(null, null, null);
        }} onChange={(e)=> updateHalftone(e, setDotSize, "dotsize")}/>
        </div>
        <button onClick={Save}>Save</button>
    </form>
}