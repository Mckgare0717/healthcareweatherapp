import { useContext, useState } from "react";
import "./LoginForm.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../components/ActionContext/ActionContext";

const LoginForm = () => {

    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [password, setPassword] = useState("");
    const [email,setEmail] = useState("")
    const [error,setError] = useState("")
    const {setUser,setToken} = useContext(AuthContext)


    const loginForm = (e)=>{
        e.preventDefault();
        const sendData = {
            email:email,
            password:password
        } 
        axios.post("http://localhost:8000/users/login", sendData).then((res)=>{
            setUser(res.data)
            setToken(res.data.access_token)
            localStorage.setItem("token",res.data.access_token)
            localStorage.setItem("user",JSON.stringify(res.data))
            alert("you are now logged in")
            navigate("/")
        }).catch((error) =>{
            alert(error.response.data.detail)})


    }



    const regForm = (e)=>{
        e.preventDefault();
        const sendData = {
            email:email,
            password:password,
            name:name
        } 
        axios.post("http://localhost:8000/users/register", sendData).then((res)=>{
            setUser(res.data)
            setToken(res.data.access_token)
            alert("new user registered")
            navigate("/")
            localStorage.setItem("token",res.data.access_token)
            localStorage.setItem("user",JSON.parse(res.data))
            
            
        }).catch((error) =>{
            alert(JSON.stringify(error?.response?.data.detail))
        })

    }

    return (
        <div className="login-cont">
            <div class="main">
                <input type="checkbox" id="chk" aria-hidden="true" />

                <div class="signup">
                    <form onSubmit={regForm}>
                        <label className="label-cont" for="chk" aria-hidden="true">Register</label>
                        <input className="inpt-fld" type="text" name="txt" placeholder="Name" required value={name} onChange={(e)=>setName(e.target.value)}/>
                            <input className="inpt-fld" type="email" name="email" placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                <input className="inpt-fld" type="password" name="pswd" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                    <button className="auth-btn" type="submit">Sign up</button>
                                </form>
                            </div>

                            <div class="login">
                                <form className="loginForm" onSubmit={loginForm}>
                                    <label className="label-cont" for="chk" aria-hidden="true">Login</label>
                                    <input className="inpt-fld" type="email" name="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                                        <input className="inpt-fld" type="password" name="pswd" placeholder="Password" required="" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                            <button className="auth-btn" type="submit">Login</button>
                                        </form>
                                    </div>
                            </div>
                        </div>
                        
                  


                        )
}

export default LoginForm;




      