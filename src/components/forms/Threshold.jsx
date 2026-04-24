

import { useState,useEffect } from "react";

export default function Threshold({handleFunc, save}){



    const [threshold, setThreshold] = useState("128");
    const [isDragging, setIsDragging] = useState(false);



    function apply(e){
        if (e != null)
            e.preventDefault();
        handleFunc(threshold);

    }

    useEffect(()=>{
        if (isDragging) return;

        const timeout = setTimeout(()=>{
            apply(null);
        }, 500);

        return ()=> clearTimeout(timeout);

    }, [threshold]);


    function update(e){
        setThreshold(e.target.value);
    }



    function Save(e){
        e.preventDefault();
        save();
    }


    return <form>
        <div className="formElement">
        <label htmlFor="threshold">Threshold</label>
        <input type="range" min="0" max="255" value={threshold} onChange={update} onMouseDown={()=> setIsDragging(true)} 
        onMouseUp={()=> {
            setIsDragging(false);
            apply(null, "threshold")
        }} onTouchStart={()=> setIsDragging(false)} onTouchEnd={()=>{
            setIsDragging(false);
            apply(null, "threshold");
        }}/>
    </div> 
    <button className="applyThreshold" onClick={Save}>Save</button>
    </form>
}