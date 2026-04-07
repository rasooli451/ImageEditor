import { useRef, useState } from "react"




export default function Resize({handleFunc}){

    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");
    const [errorState, setErrorState] = useState(false);
    const keepAspect = useRef(null);
    const dontKeepAspect = useRef(null);
    
    const errorMsg = "Make sure that all fields are filled and try again."

    function handleInput(callback, e){
        callback(e.target.value);
    }


    function applyEffect(e){
        e.preventDefault();
        if (height.length == "" || width.length == "" || (!keepAspect.current.checked && !dontKeepAspect.current.checked)){
            setErrorState(true);
        }
        else{
            setErrorState(false);
            handleFunc(width, height, keepAspect.current.checked ? true: false);

        }
    }



    return <form>
        {errorState ? <p>{errorMsg}</p> : null}
        <div className="formElement">
            <label htmlFor="width">Desired Width:</label>
            <input type="number" id="width" name="width" required value={width} onChange={(e)=> handleInput(setWidth, e)}/>
        </div>
        <div className="formElement">
            <label htmlFor="Height">Desired Height:</label>
            <input type="number" id="Height" name="height" required value={height} onChange={(e)=> handleInput(setHeight, e)}/>
        </div>
        <div className="formElement">
            <label htmlFor="yes">Keep Aspect Ratio*:</label>
            <input type="radio" name="aspect" id="yes" required ref={keepAspect}/>
        </div>
        <div className="formElement">
            <label htmlFor="No">Don't Keep Aspect Ratio:</label>
            <input type="radio" name="aspect" id="No" ref={dontKeepAspect}/>
        </div>
        <p className="sidenote">*If true and both width and height are provided, the image will be resized to fit within the specified dimensions without stretching.</p>
        <button type="submit" onClick={applyEffect}>Apply</button>
    </form>
}