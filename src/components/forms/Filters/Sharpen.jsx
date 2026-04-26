import { useState } from "react";






export default function Sharpen({handleFunc, save, revert}){


    const [sharpened, setSharpened] = useState(false);



    function applySharpening(e){
        setSharpened(!sharpened);
        if (!sharpened){
            handleFunc();
        }
        else{
            revert();
        }
    }


    function Save(e){
        e.preventDefault();
        save();
    }




    return <form>
        <div className="formElement">
            <label htmlFor="sharpen">Sharpen Image</label>
            <input type="checkbox" id="sharpen" onChange={applySharpening}/>
        </div>
         {sharpened ? <button type="button" onClick={Save}>Save</button>: <button type="button" onClick={Save} disabled >Save</button>}
    </form>
}