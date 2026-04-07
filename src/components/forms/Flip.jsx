
import { useRef } from "react";

export default function Flip({handleFunc}){

    const verticalRef = useRef(null);
    const horizontalRef = useRef(null);



    function applyFlip(){
        if (!verticalRef.current.checked && !horizontalRef.current.checked){
            console.log("bad input");
        }
        else{
            handleFunc(verticalRef.current.checked ? 'vertical': 'horizontal');
        }
    }

    return <div>
        <div className="formElement">
            <label htmlFor="verticalFlip">Vertical Flip</label>
            <input type="radio" name="flip" required id="verticalFlip" ref={verticalRef}/>
        </div>
        <div className="formElement">
            <label htmlFor="horizontalFlip">Horizontal Flip</label>
            <input type="radio" name="flip" id="horizontalFlip" ref={horizontalRef}/>
        </div>

        <button type="button" onClick={applyFlip}>Apply</button>
    </div>
}