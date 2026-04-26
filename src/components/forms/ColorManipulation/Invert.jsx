import { useState } from "react";






export default function Invert({handleFunc, save, revert}){
    const [Inverted, setInverted] = useState(false);
    
    

    function applyInvertion(e){
        setInverted(!Inverted);
        if (!Inverted){
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
            <label htmlFor="invertion">Invert Colors</label>
            <input type="checkbox" id="invertion" required onChange={(e)=> applyInvertion(e) }/>
        </div>

         {Inverted ? <button type="button" onClick={Save}>Save</button>: <button type="button" onClick={Save} disabled >Save</button>}
    </form>
}