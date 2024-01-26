import "./Sitemap.css"
import { useNavigate } from "react-router-dom";

const SiteMap =()=>{
    const navigate = useNavigate()
    return(
        <div className="sitemap">
            <a href="/privacy">Privacy Policy</a>
            <a href="/about">About Us</a>
        </div>
    )
}

export default SiteMap;