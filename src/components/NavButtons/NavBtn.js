import "./NavBtn.css"
import { useNavigate } from "react-router-dom"

const NavBtn =({text,link})=>{
    const navigate = useNavigate()
    return(
        <div className="btn-cont">
            <button className="btn" onClick={()=>navigate(link)}>{text}</button>
        </div>
    )
}


export default NavBtn