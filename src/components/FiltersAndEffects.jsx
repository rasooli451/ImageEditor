


export default function FiltersAndEffects({unimportantfunc}){





    function toggleForm(e){
        unimportantfunc(e.target.dataset.identity);
    }


    return <div className="tools">
        <button className="button" type="button" onClick={toggleForm} data-identity="Blur">Blur</button>
        <button className="button" type="button" data-identity="Sharpen" onClick={toggleForm}>Sharpen</button>
        <button className="button" type="button" onClick={toggleForm} data-identity="Cartoon">Cartoonize</button>
        <button className="button" type="button" onClick={toggleForm} data-identity="Emboss">Emboss</button>
        <button className="button" type="button" onClick={toggleForm} data-identity="Sketch" >Sketch</button>
        <button className="button" type="button" onClick={toggleForm} data-identity="Halftone" >Halftone</button>
        <button className="button" type="button" onClick={toggleForm} data-identity="Pixelate">Pixelate</button>
        <button className="button" type="button" onClick={toggleForm} data-identity="Denoise">Denoise</button>
    </div> 

}