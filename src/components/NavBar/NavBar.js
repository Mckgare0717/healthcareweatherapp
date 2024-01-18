import "./NavBar.css"
import NavBtn from "../NavButtons/NavBtn";
import ToggleBtn from "../ToggleBtn/ToggleBtn";

const NavBar = () => {
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
                    
                    <div className="cont-btn">
                    <NavBtn text="Sign In" link="/login"/>
                    </div>
                    <ToggleBtn/>
                </div>
            </div>
        </header>
    )
}


export default NavBar;