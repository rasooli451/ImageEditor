import { useState } from "react";


export default function Sepia({handleFunc, save, revert}){


    const [sepia, setSepia] = useState(false);


    function applySepia(e){
        setSepia(!sepia);
        if (!sepia){
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
            <label htmlFor="sepia">Apply Sepia</label>
            <input type="checkbox" id="sepia" required onChange={(e)=> applySepia(e) }/>
        </div>
        
        {sepia ? <button type="button" onClick={Save}>Save</button>: <button type="button" onClick={Save} disabled >Save</button>}
    </form>
}