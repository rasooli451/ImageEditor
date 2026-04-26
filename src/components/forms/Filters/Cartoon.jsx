
import { useEffect, useState } from "react";

export default function Cartoon({handleFunc, save}){



    const [numOfColors, setNumOfColors] = useState("8");
    const [edgeSize, setEdgeSize] = useState("1");
    const [isDragging, setDragging] = useState(false);


    



        function apply(e, callback, lastChanged){
            if (e!=null)
                callback(e.target.value);
            if (lastChanged == "edgesize"){
                handleFunc(e.target.value, numOfColors)
            }
            else if(lastChanged == "numofcolors"){
                handleFunc(edgeSize, e.target.value);
            }
            else{
                handleFunc(edgeSize, numOfColors);
            }
        }

        function Save(e){
        e.preventDefault();
        save();
    }

    useEffect(()=>{
            if (isDragging) return;
    
            const timeout = setTimeout(()=>{
                apply(null, null, null);
            }, 500);
    
            return ()=> clearTimeout(timeout);
    
        }, [edgeSize, numOfColors]);




    return <form>
        <div className="formElement">
            <label htmlFor="edgeSize">Edge Size</label>
            <input type="range" min="1" max="5" id="edgeSize" required value={edgeSize} onMouseDown={()=> setDragging(true)} 
        onMouseUp={()=> {
            setDragging(false);
            apply(null, "threshold")
        }} onTouchStart={()=> setDragging(false)} onTouchEnd={()=>{
            setDragging(false);
            apply(null, "threshold");
        }} onChange={(e)=> apply(e, setEdgeSize, "edgesize")}/>
        </div>

        <div className="formElement">
            <label htmlFor="numOfColors">Number Of Colors</label>
            <input type="range" min="2" max="16" id="tileGridSize" required value={numOfColors} onMouseDown={()=> setDragging(true)} 
        onMouseUp={()=> {
            setDragging(false);
            apply(null, "threshold")
        }} onTouchStart={()=> setDragging(false)} onTouchEnd={()=>{
            setDragging(false);
            apply(null, "threshold");
        }} onChange={(e)=> apply(e, setNumOfColors, "numofcolors")}/>
        </div>

        <button type="button" onClick={Save}>Save</button>
    </form>
    
}