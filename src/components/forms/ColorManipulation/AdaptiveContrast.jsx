import { useState,useEffect } from "react";



export default function AdaptiveContrast({handleFunc, save}){


    const [clipLimit, setClipLimit] = useState("2.0");
    const [tileGridSize, setTileGridSize] = useState("8");
    const [isDragging, setDragging] = useState(false);


    useEffect(()=>{
            if (isDragging) return;
    
            const timeout = setTimeout(()=>{
                apply(null, null, null);
            }, 500);
    
            return ()=> clearTimeout(timeout);
    
        }, [tileGridSize, clipLimit]);



        function apply(e, callback, lastChanged){
            if (e!=null)
                callback(e.target.value);
            if (lastChanged == "cliplimit"){
                handleFunc(e.target.value, tileGridSize)
            }
            else if(lastChanged == "tileGridSize"){
                handleFunc(clipLimit, e.target.value);
            }
            else{
                handleFunc(clipLimit, tileGridSize);
            }
        }

        function Save(e){
        e.preventDefault();
        save();
    }




    return <form>
        <div className="formElement">
            <label htmlFor="clipLimit">Clip Limit</label>
            <input type="range" min="0.5" max="10.5" id="clipLimit" required value={clipLimit} onMouseDown={()=> setDragging(true)} 
        onMouseUp={()=> {
            setDragging(false);
            apply(null, "threshold")
        }} onTouchStart={()=> setDragging(false)} onTouchEnd={()=>{
            setDragging(false);
            apply(null, "threshold");
        }} onChange={(e)=> apply(e, setClipLimit, "cliplimit")}/>
        </div>

        <div className="formElement">
            <label htmlFor="tileGridSize">Tile Grid Size</label>
            <input type="range" min="2" max="16" id="tileGridSize" required value={tileGridSize} onMouseDown={()=> setDragging(true)} 
        onMouseUp={()=> {
            setDragging(false);
            apply(null, "threshold")
        }} onTouchStart={()=> setDragging(false)} onTouchEnd={()=>{
            setDragging(false);
            apply(null, "threshold");
        }} onChange={(e)=> apply(e, setTileGridSize, "gridsize")}/>
        </div>

        <button type="button" onClick={Save}>Save</button>
    </form>

}