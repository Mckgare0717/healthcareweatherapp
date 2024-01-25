import "./NavBar.css"
import NavBtn from "../NavButtons/NavBtn";
import ToggleBtn from "../ToggleBtn/ToggleBtn";
import { AuthContext } from "../ActionContext/ActionContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {

    const {token,setToken,setUser} = useContext(AuthContext)
    const navigate = useNavigate()


    const LogoutBtn=()=>{
        function isLoggedOut(){
            
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            setToken(null)
            setUser(null)
            navigate("/")
            alert("you are now logged out")
            
            
        }


        if (token){
            return(
                <button onClick={isLoggedOut} className="logoutbtn">Sign Out</button>
            )
        }

    }
    

    return (
        <header>
            <div className="navbar">
                <div className="HeadName">
                    <h2>Health Advice Group</h2>
                </div>
                <div className="button-cont">
                    <NavBtn text="Home" link="/"/>
                    <NavBtn text="Blog" link="/blog"/>
                    <NavBtn text="Weather" link="/weather"/>
                    {token ? <NavBtn text="Profile" link="/profile"/>: null}
                    <div className="cont-btn">
                    {token === null &&<NavBtn text="SignIn/Signup" link="/login"/>}
                    <LogoutBtn/>
                    </div>
                    <ToggleBtn/>
                </div>
            </div>
        </header>
    )
}


export default NavBar;