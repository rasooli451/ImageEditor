import { useState, useRef } from "react"




export default function Thumbnail({handleFunc}){


    const [width, setWidth] = useState("");
    const [height, setHeight] = useState("");



    function handleInput(callback, e){
        callback(e.target.value);
    }

    const cropRef = useRef(null);


    function Generate(e){
        e.preventDefault();
        if (width.length == 0 || height.length == 0){
            console.log("error msg");
        }
        else{
            handleFunc(width, height, cropRef.current.checked);
        }
    }

    return <form>
        <div className="formElement">
            <label htmlFor="width">Target Width:</label>
            <input type="number" required id="width" value={width} onChange={(e)=> handleInput(setWidth, e)}/>
        </div>
        <div className="formElement">
            <label htmlFor="height">Target height:</label>
            <input type="number" required id="height" value={height} onChange={(e)=> handleInput(setHeight, e)}/>
        </div>
        <div className="formElement">
            <label htmlFor="crop">Crop*</label>
            <input type="checkbox" required id="crop" ref={cropRef}/>
        </div>
        <button type="button" onClick={Generate}>Generate</button>
        <p>*Whether to crop the image to exactly match the target dimensions. If unchecked, the image will be resized to fit within the dimensions while maintaining aspect ratio.</p>
    </form>
}