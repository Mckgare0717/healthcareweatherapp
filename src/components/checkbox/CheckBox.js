import "./CheckBox.css"


const CheckBox = ({onchange,text,whenChecked})=>{
    return(
<div>
    <label>
        <input type="checkbox" onChange={onchange} checked={whenChecked}/>
        {text}
    </label>
</div>
    )
}


export default CheckBox;