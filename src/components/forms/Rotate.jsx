
import { useState , useRef} from "react";
import rotateLeft from "../../icons/rotate-left.png";
import rotateRight from "../../icons/rotate-right.png";

export default function Rotate({handleFunc}){


    const [customDegree, setCustomDegree] = useState("");

    function applyLeftRotation(){
        handleFunc('-90');
    }

    function applyRightRotation(){
        handleFunc('90');

    }


    function updateDegree(e){
        setCustomDegree(e.target.value);
    }

    function applyCustomDegree(){
        if (customDegree.length == 0 || Number(customDegree) < -360 || Number(customDegree) > 360){
            console.log("bad input");
        }
        else{
            handleFunc(customDegree);
        }
    }


    return <div>
        <div className="formElement">
            <button className="leftTurn" onClick={applyLeftRotation}><img src={rotateLeft} alt="rotateLeft" title="Rotate image 90 degress anti-clockwise"/></button>
        </div>
        <div className="formElement">
            <button className="rightTurn" onClick={applyRightRotation}><img src={rotateRight} alt="rotateRight" title="Rotate image 90 degress clockwise"/></button>
        </div>

        <div className="formElement">
            <label htmlFor="customDegree">Custom Degree:</label>
            <input type="number"  required value={customDegree} onChange={updateDegree} placeholder="between -360 to 360.."/>
        </div>

        <button type="button" onClick={applyCustomDegree} >Apply Custom Degree</button>
    </div>
}