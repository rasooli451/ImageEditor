import { useState } from "react"




export default function Convert({handleFunc}){


    const [target, setTarget] = useState("empty");




    function updateTarget(e){


        setTarget(e.target.value);
    }




    function Convert(e){
        e.preventDefault();
        if (target == "empty"){
            console.log("error msg");
        }
        else{
            handleFunc(target);
        }
    }



    return <form>
        <div className="formElement">
            <label htmlFor="targetFormat">Target Format: </label>
            <select name="targetFormat" id="targetFormat" value={target} onChange={updateTarget}>
                <option value="empty">Select a format</option>
                <option value="PNG">PNG</option>
                <option value="JPEG">JPEG</option>
                <option value="WEBP">WEBP</option>
                <option value="BMP">BMP</option>
                <option value="TIFF">TIFF</option>
            </select>
        </div>
        <button type="button" onClick={Convert}>Convert</button>
    </form>
}


/*add loading states for convert, compress */


