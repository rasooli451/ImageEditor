import { useState } from "react";






export default function Posterize({handleFunc, save}){


    const [level, setLevel] = useState("4");

    function update(e){
        setLevel(e.target.value);
        handleFunc(e.target.value);
    }


    function Save(e){
        e.preventDefault();
        save();
    }


    return <form>
        <div className="formElement">
            <label htmlFor="level">Level</label>
            <input type="number" min="2" max="16" required id="level" value={level} onChange={update}/>
        </div>
        <button type="button" onClick={Save}>Save</button>
    </form>

}