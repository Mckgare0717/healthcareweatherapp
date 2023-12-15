import "./ToggleBtn.css"
import {useTheme} from "../darkModeContext/darkModeContext.js"


const ToggleBtn = () =>{
    const {isDarkMode,toggleDarkMode} = useTheme()
    return(
        <button className={`toggle-btn ${isDarkMode}`} onclick={toggleDarkMode}>Take me dark</button>
    )
}

export default ToggleBtn