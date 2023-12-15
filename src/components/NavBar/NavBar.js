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
                    <NavBtn text="Home" link="/home"/>
                    <NavBtn text="Blog" link="/blog"/>
                    <NavBtn text="Weather" link="/weather"/>
                    <ToggleBtn/>
                </div>
            </div>
        </header>
    )
}


export default NavBar;