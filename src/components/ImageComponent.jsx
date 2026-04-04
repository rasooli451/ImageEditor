

import { useState } from "react"

import Tools from "./Tools"
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function ImageComponent({image,file, selectable, triggerSelect, formSelection, cropFunc}){

    const [crop, setCrop] = useState(null);
    const [displayApplyCropButton, setDisplayApplyCropButton] = useState(false);



    function tempFunc(){
        triggerSelect();
        setDisplayApplyCropButton(!displayApplyCropButton);
    }

    function passUpFormSelection(identity){
        formSelection(identity);
    }


    function applyCrop(){
        if (crop == null){
            console.log("empty crop");
        }
        else{
            cropFunc(crop);
        }
    }

    return <div className="display">
        <Tools switchSelect={tempFunc} unimportantfunc={(identity)=> passUpFormSelection(identity)} />
        <div className="ImageContainer">
            { selectable ? 
            <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                 <img src={image} alt="To crop" />
            </ReactCrop>: 
            image == null ? <h2>Upload an image to display</h2>: <div>
            <img src={image} />
            </div> 
            }
            {displayApplyCropButton ? <button onClick={applyCrop}>Crop</button> : null}
        </div>
    </div> 
}