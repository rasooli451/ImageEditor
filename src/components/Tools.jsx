



export default function Tools({switchSelect, unimportantfunc}){

    function handleCrop(){
        switchSelect();
    }

    function toggleForm(e){
        console.log(e.target.dataset.identity);
        unimportantfunc(e.target.dataset.identity);
    }

    return <div className="tools">
        <button className="button" type="button" onClick={toggleForm} data-identity="Resize">Resize</button>
        <button className="button" type="button" onClick={handleCrop}>Crop</button>
        <button className="button" type="button">Rotate</button>
        <button className="button" type="button">Flip</button>
        <button className="button" type="button">Convert</button>
        <button className="button" type="button">Compress</button>
        <button className="button" type="button">Thumbnail</button>
        <button className="button" type="button">Color adjustments</button>
        <button className="button" type="button">Filters & Effects</button>
        <button className="button" type="button">Remove Background</button>
    </div>
}