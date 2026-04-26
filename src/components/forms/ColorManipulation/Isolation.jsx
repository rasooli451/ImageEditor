
import { useState } from "react";

export default function Isolation({handleFunc, save}){



    const [colorChannel, setColorChannel] = useState("D");



    function apply(e){
        e.preventDefault();
        setColorChannel(e.target.value);
        handleFunc(e.target.value);
    }


    function Save(e){
        e.preventDefault();
        save();
    }

    return <form>
        <div className="formElement">
        <label htmlFor="isolateColorChannel">Isolate Color Channel</label>
        <select name="colorchannel" id="isolateColorChannel" onChange={(e)=> apply(e, "colorChannel") } value={colorChannel}>
            <option value="D">Default</option>
            <option value="R">Red</option>
            <option value="G">Green</option>
            <option value="B">Blue</option>
        </select>
    </div>
    <button className="button" onClick={Save}>Save</button>
    </form>
}