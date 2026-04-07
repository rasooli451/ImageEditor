

import { useState } from "react"

import Tools from "./Tools"
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function ImageComponent({image,file, selectable, triggerSelect, formSelection, cropFunc}){

    const [crop, setCrop] = useState(null);
    const [displayApplyCropButton, setDisplayApplyCropButton] = useState(false);
    const [naturalImageMeta, setNaturalImageMeta] = useState(null);
    const [displayImageMeta, setDisplayImageMeta] = useState(null);



    function tempFunc(){
        triggerSelect();
        setDisplayApplyCropButton(!displayApplyCropButton);
    }

    function passUpFormSelection(identity){
        formSelection(identity);
    }


    function applyCrop(){
        if (crop == null || naturalImageMeta == null || displayImageMeta == null){
            console.log("empty crop");
        }
        else{
             const scaleX = naturalImageMeta.width / displayImageMeta.width;
             const scaleY = naturalImageMeta.height / displayImageMeta.height;
             const finalC = {x : Math.round(crop.x * scaleX), y: Math.round(crop.y * scaleY), width : Math.round(crop.width * scaleX), height : Math.round(crop.height * scaleY)};
             console.log(finalC);
             cropFunc(finalC);
             setCrop(null);
             setDisplayApplyCropButton(false);
             triggerSelect(); 
        }
    }

    return <div className="display">
        <Tools switchSelect={tempFunc} unimportantfunc={(identity)=> passUpFormSelection(identity)} />
        <div className="ImageContainer">
            { selectable ? 
            <ReactCrop crop={crop} onChange={(c) =>setCrop(c)} unit="px" key={image}>
                 <img src={image} alt="To crop" onLoad={(e)=> {
                    const img = e.target;
                    setNaturalImageMeta({width : img.naturalWidth, height : img.naturalHeight});
                    const rect = img.getBoundingClientRect();
                    setDisplayImageMeta({width : rect.width, height: rect.height});
                 }}/>
            </ReactCrop>: 
            image == null ? <h2>Upload an image to display</h2>: <div>
            <img src={image} />
            </div> 
            }
            {displayApplyCropButton ? <button onClick={applyCrop}>Crop</button> : null}
        </div>
    </div> 
}