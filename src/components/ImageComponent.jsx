

import { useState } from "react"

import Tools from "./Tools"
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import ColorAdjustments from "./ColorAdjustments";
import FiltersAndEffects from "./FiltersAndEffects";

export default function ImageComponent({image, selectable, triggerSelect, cropFunc, adjustments}){

    const [crop, setCrop] = useState(null);
    const [naturalImageMeta, setNaturalImageMeta] = useState(null);
    const [displayImageMeta, setDisplayImageMeta] = useState(null);



    function applyCrop(){
        if (crop == null || naturalImageMeta == null || displayImageMeta == null){
            console.log("empty crop");
        }
        else{
             const scaleX = naturalImageMeta.width / displayImageMeta.width;
             const scaleY = naturalImageMeta.height / displayImageMeta.height;
             const finalC = {x : Math.round(crop.x * scaleX), y: Math.round(crop.y * scaleY), width : Math.round(crop.width * scaleX), height : Math.round(crop.height * scaleY)};
             cropFunc(finalC);
             setCrop(null);
             triggerSelect(); 
        }
    }

    return <div className="display">
        <div className="ImageContainer">
            { selectable ? 
            <ReactCrop crop={crop} onChange={(c) =>setCrop(c)} unit="px" key={image}>
                 <img src={image} className="preview" alt="To crop" onLoad={(e)=> {
                    const img = e.target;
                    setNaturalImageMeta({width : img.naturalWidth, height : img.naturalHeight});
                    const rect = img.getBoundingClientRect();
                    setDisplayImageMeta({width : rect.width, height: rect.height});
                 }} style={{filter: 
            `brightness(${adjustments.brightness}%)
             contrast(${adjustments.contrast}%)
             grayscale(${adjustments.grayscale}%)`}}/>
            </ReactCrop>: 
            image == null ? <h2>Upload an image to display</h2>: <div>
            <img src={image} className="preview" style={{filter: 
            `brightness(${adjustments.brightness}%)
             contrast(${adjustments.contrast}%)
             grayscale(${adjustments.grayscale}%)`}}/>
            </div> 
            }
            {selectable ? <button onClick={applyCrop}>Crop</button> : null}
        </div>
    </div> 
}