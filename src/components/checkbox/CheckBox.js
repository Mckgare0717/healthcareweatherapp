import "./CheckBox.css"


const CheckBox = ({onchange,text})=>{
    return(
<div>
    <label>
        <input type="checkbox" onChange={onchange}/>
        {text}
    </label>
</div>
    )
}


export default CheckBox;