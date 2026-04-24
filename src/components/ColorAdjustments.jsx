






export default function ColorAdjustments({unimportantfunc}){





    function toggleForm(e){
        unimportantfunc(e.target.dataset.identity);
    }


    return <div className="tools">
        <button className="button" type="button" onClick={toggleForm} data-identity="BasicAdjustments">Basic Adjustments</button>
        <button className="button" type="button" data-identity="Threshold" onClick={toggleForm}>Threshold</button>
        <button className="button" type="button" onClick={toggleForm} data-identity="Isolation">Isolate Channel</button>
        <button className="button" type="button" onClick={toggleForm} data-identity="Sepia">Sepia</button>
        <button className="button" type="button"onClick={toggleForm} data-identity="Invert">Invert Colors</button>
        <button className="button" type="button" onClick={toggleForm} data-identity="Tint" >Tint</button>
        <button className="button" type="button" onClick={toggleForm} data-identity="Gamma" >Gamma Correction</button>
        <button className="button" type="button" onClick={toggleForm} data-identity="Posterize">Posterize</button>
        <button className="button" type="button" onClick={toggleForm} data-identity="AdaptiveContrast">Adaptive Contrast</button>
    </div> 

}