import "./NavBar.css"
import NavBtn from "../NavButtons/NavBtn";
import ToggleBtn from "../ToggleBtn/ToggleBtn";
import { AuthContext } from "../ActionContext/ActionContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const NavBar = () => {

    const {user} = useContext(AuthContext)
    const navigate = Navigate()

    function isLoggedOut(){
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        alert("you are logged out")
        navigate("/home")
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
                    {user ? <NavBtn text="Profile" link="/profile"/>: null}
                    <div className="cont-btn">
                    {!user?<NavBtn text="Sign In" link="/login"/>:<NavBtn text="Sign Out" link={isLoggedOut()}/>}
                    </div>
                    <ToggleBtn/>
                </div>
            </div>
        </header>
    )
}


export default NavBar;