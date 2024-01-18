import "./Profile.css"
import { AuthContext } from "../../components/ActionContext/ActionContext";
import { useContext } from "react";


const ProfilePage =()=>{
    const {user} = useContext(AuthContext)

    return(
        <div>
            <div className="profile-cont">
                <h4>Name: {user.name}</h4>
                <h4>Email: {user.email}</h4>
            </div>
        </div>
    )
}


export default ProfilePage;