
import { useState } from "react";


export default function BasicAdjustments({handleFunc, adjustments, setAdjustments}){
    const [brightness, setBrightness] = useState(adjustments.brightness);
    const [grayScale, setGrayScale] = useState(adjustments.grayscale);
    const [contrast, setContrast] = useState(adjustments.contrast);



    function updateValue(callback, e, lastChanged){
        callback(e.target.value);
        if (lastChanged == "brightness"){
            setAdjustments({brightness: e.target.value, contrast: contrast, grayscale: grayScale})
        }
        else if(lastChanged == "contrast"){
            setAdjustments({brightness: brightness, contrast: e.target.value , grayscale: grayScale})
        }
        else{
            setAdjustments({brightness: brightness, contrast: contrast, grayscale: e.target.value})
        }
    }


    function apply(e){
        e.preventDefault();
        handleFunc({brightness: brightness, contrast: contrast, grayscale: grayScale});
    }


    return <form>
        <div className="basicAdjustments">
        <div className="formElement">
        <label htmlFor="brightness">Brightness</label>
        <input type="range" min="0" max="200" value={brightness} onChange={(e)=> updateValue(setBrightness, e, "brightness")}/>
    </div>
    <div className="formElement">
        <label htmlFor="contrast">Contrast</label>
        <input type="range" min="0" max="200" value={contrast} onChange={(e)=> updateValue(setContrast, e, "contrast")}/>
    </div>
    <div className="formElement">
        <label htmlFor="grayscale">Grayscale</label>
        <input type="range" min="0" max="200" value={grayScale} onChange={(e)=> updateValue(setGrayScale, e, "grayscale")}/>
    </div>
       <button className="applyBasicAdjusts" onClick={(e)=> apply(e,"basics")}>Save</button>
    </div>
    </form>
}