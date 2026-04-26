


import { useState, useEffect } from "react";



export default function Denoise({handleFunc, save}){

    const [strength, setStrength] = useState("10");
    const [isDragging, setDragging] = useState(false);



    function updateStrength(e){
        if (e != null){
            setStrength(e.target.value);
            handleFunc(e.target.value);
        }
        else{
            handleFunc(strength);
        }
    }


    useEffect(()=>{
            if (isDragging) return;
    
            const timeout = setTimeout(()=>{
                updateStrength(null);
            }, 500);
    
            return ()=> clearTimeout(timeout);
    
        }, [strength]);




    function Save(e){
        e.preventDefault();
        save();
    }

    return <form>
        <div className="formElement">
            <label htmlFor="strength">Strength</label>
            <input type="range" min="1" max="20" id="strength" required value={strength} onChange={updateStrength} onMouseDown={()=> setDragging(true)} 
        onMouseUp={()=> {
            setDragging(false);
            updateStrength(null)
        }} onTouchStart={()=> setDragging(false)} onTouchEnd={()=>{
            setDragging(false);
            updateStrength(null);
        }}/>
        </div>
        <button onClick={Save}>Save</button>
    </form>
}