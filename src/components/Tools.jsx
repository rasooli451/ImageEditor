



export default function Tools({switchSelect, unimportantfunc, Compress, removeBG}){

    function handleCrop(){
        switchSelect();
    }

    function toggleForm(e){
        unimportantfunc(e.target.dataset.identity);
    }

    return <div className="tools">
        <button className="button" type="button" onClick={toggleForm} data-identity="Resize">Resize</button>
        <button className="button" type="button" onClick={handleCrop}>Crop</button>
        <button className="button" type="button" onClick={toggleForm} data-identity="Rotate">Rotate</button>
        <button className="button" type="button" onClick={toggleForm} data-identity="Flip">Flip</button>
        <button className="button" type="button"onClick={toggleForm} data-identity="Convert">Convert</button>
        <button className="button" type="button" onClick={Compress}>Compress</button>
        <button className="button" type="button" onClick={toggleForm} data-identity="Thumbnail" >Thumbnail</button>
        <button className="button" type="button">Filters & Effects</button>
        <button className="button" type="button" onClick={removeBG}>Remove Background</button>
    </div>
}