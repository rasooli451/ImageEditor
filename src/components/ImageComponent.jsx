

import { useState } from "react"

import Tools from "./Tools"
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export default function ImageComponent({image,file, selectable, triggerSelect}){

    const [crop, setCrop] = useState();

    return <div className="display">
        <Tools file={file} switchSelect={triggerSelect}/>
        <div className="ImageContainer">
            { selectable ? 
            <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
                 <img src={image} alt="To crop" />
            </ReactCrop>: 
            image == null ? <h2>Upload an image to display</h2>: <div>
            <img src={image} />
            </div> 
            }
        </div>
    </div> 
}