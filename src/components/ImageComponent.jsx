



export default function ImageComponent({image}){


    return <div className="ImageContainer">
        {image == null ? <h2>Upload an image to display</h2>: <div>
            <img src={image} />
            </div>}
    </div>
}