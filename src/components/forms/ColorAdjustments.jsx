import { useEffect, useState} from "react"







export default function ColorAdjustments({handleFunc, adjustments, setAdjustments, revert, save}){



    const [brightness, setBrightness] = useState(adjustments.brightness);
    const [grayScale, setGrayScale] = useState(adjustments.grayscale);
    const [contrast, setContrast] = useState(adjustments.contrast);
    const [showThreshold, setShowThreshold] = useState(false);
    const [threshold, setThreshold] = useState(adjustments.threshold);
    const [isDragging, setIsDragging] = useState(false);
    const [colorChannel, setColorChannel] = useState("D");



    function apply(e, what){
        if (e != null)
            e.preventDefault();
        if (what == "basics"){
            handleFunc(what, {brightness: brightness, contrast: contrast, grayscale: grayScale});
        }
        else if (what == "threshold"){
            handleFunc(what, threshold);
        }
        else if(what == "colorChannel"){
            console.log(e.target.value);
            setColorChannel(e.target.value);
            handleFunc(what, e.target.value);
        }
    }

    function toggleThreshold(){
        setShowThreshold(!showThreshold);
        if (showThreshold){
            revert();
        }
    }



    useEffect(()=>{
        if (isDragging || !showThreshold) return;

        const timeout = setTimeout(()=>{
            apply(null, "threshold");
        }, 500);

        return ()=> clearTimeout(timeout);

    }, [threshold, showThreshold]);

    function updateValue(callback, e, lastChanged){
        callback(e.target.value);
        if (lastChanged == "brightness"){
            setAdjustments({brightness: e.target.value, contrast: contrast, grayscale: grayScale, threshold: threshold})
        }
        else if(lastChanged == "contrast"){
            setAdjustments({brightness: brightness, contrast: e.target.value , grayscale: grayScale, threshold: threshold})
        }
        else{
            setAdjustments({brightness: brightness, contrast: contrast, grayscale: e.target.value, threshold: threshold})
        }
    }

    function thresholdUpdate(e){
        setThreshold(e.target.value);
        setAdjustments({brightness: brightness, contrast: contrast, grayscale: grayScale, threshold: e.target.value});
    }


    function Save(e){
        e.preventDefault();
        save();
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
    <div className="threshold">
        <div className="formElement">
            <label htmlFor="showThreshold">Apply Threshold</label>
            <input type="checkbox" id="showThreshold" onChange={toggleThreshold}/>
        </div>
        {showThreshold ? <div className="thresholdInput"><div className="formElement">
        <label htmlFor="threshold">Threshold</label>
        <input type="range" min="0" max="255" value={threshold} onChange={thresholdUpdate} onMouseDown={()=> setIsDragging(true)} 
        onMouseUp={()=> {
            setIsDragging(false);
            apply(null, "threshold")
        }} onTouchStart={()=> setIsDragging(false)} onTouchEnd={()=>{
            setIsDragging(false);
            apply(null, "threshold");
        }}/>
    </div> 
    <button className="applyThreshold" onClick={Save}>Save</button></div>: null}
   </div>
   <div className="colorChannel">
    <div className="formElement">
        <label htmlFor="isolateColorChannel">Isolate Color Channel</label>
        <select name="colorchannel" id="isolateColorChannel" onChange={(e)=> apply(e, "colorChannel") } value={colorChannel}>
            <option value="D">Default</option>
            <option value="R">Red</option>
            <option value="G">Green</option>
            <option value="B">Blue</option>
        </select>
    </div>
    <button className="button" onClick={Save}>Save</button>
   </div>
    








</form>

    
}