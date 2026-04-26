
import { useState } from "react";


export default function Emboss({handleFunc, save, revert}){

    const [embossed, setEmbossed] = useState(false);
        
        

    function applyEmboss(e){
        setEmbossed(!embossed);
        if (!embossed){
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
            <label htmlFor="embossion">Apply Emboss</label>
            <input type="checkbox" id="embossion" required onChange={applyEmboss }/>
        </div>

            {embossed ? <button type="button" onClick={Save}>Save</button>: <button type="button" onClick={Save} disabled >Save</button>}
    </form>
}