



export default function Resize({file}){


    return <form action="">
        <div className="formElement">
            <label htmlFor="width">Desired Width:</label>
            <input type="number" id="width" name="width" required/>
        </div>
        <div className="formElement">
            <label htmlFor="Height">Desired Height:</label>
            <input type="number" id="Height" name="height" required/>
        </div>
        <div className="formElement">
            <label htmlFor="yes">Keep Aspect Ratio:</label>
            <input type="radio" name="aspect" id="yes"/>
        </div>
        <div className="formElement">
            <label htmlFor="No">Don't Keep Aspect Ratio:</label>
            <input type="radio" name="aspect" id="No"/>
        </div>
        <button type="submit">Apply</button>
    </form>
}