



export default function Tools({file, switchSelect}){

    function handleCrop(){
        switchSelect();
    }
    return <div className="tools">
        <button className="button" type="button" >Resize</button>
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