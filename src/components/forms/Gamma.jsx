import { useState } from "react";




export default function Gamma({handleFunc, save}){


    const [gamma, setGamma] = useState("1.0");



    function updateGamma(e){
        setGamma(e.target.value);
        handleFunc(e.target.value);
    }

     function Save(e){
        e.preventDefault();
        save();
    }
    return <form>
        <div className="formElement">
            <label htmlFor="gamma">Gamma</label>
            <input type="range" min="0.1" max="5.1" value={gamma} id="gamma" required onChange={updateGamma} />
        </div>

        <button type="button" onClick={Save} >Save</button>
    </form>
}