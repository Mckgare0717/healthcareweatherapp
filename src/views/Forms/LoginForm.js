import { useState } from "react";
import "./LoginForm.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const navigate = useNavigate()
    const [name,setName] = useState("")
    const [password, setPassword] = useState("");
    const [email,setEmail] = useState("")
    const [error,setError] = useState("")

    const loginForm = (e)=>{
        e.preventDefault();
        const sendData = {
            email:email,
            password:password
        } 
        axios.post("http://localhost:8000/users/login", sendData).then((res)=>{
            console.log("getting data")
            localStorage.setItem("token",res.data.access_token)
            localStorage.setItem("id",res.data.id)
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
            console.log("getting sent")
            localStorage.setItem("token",res.data.access_token)
            localStorage.setItem("id",res.data.id)
            navigate("/")
        }).catch((error) =>{
            alert(JSON.stringify(error.response.data.detail))})

    }

    return (
        <div className="login-cont">
            <div class="main">
                <input type="checkbox" id="chk" aria-hidden="true" />

                <div class="signup">
                    <form onSubmit={regForm}>
                        <label for="chk" aria-hidden="true">Register</label>
                        <input type="text" name="txt" placeholder="Name" required value={name} onChange={(e)=>setName(e.target.value)}/>
                            <input type="email" name="email" placeholder="Email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                <input type="password" name="pswd" placeholder="Password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                    <button className="auth-btn" type="submit">Sign up</button>
                                </form>
                            </div>

                            <div class="login">
                                <form className="loginForm" onSubmit={loginForm}>
                                    <label for="chk" aria-hidden="true">Login</label>
                                    <input type="email" name="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                                        <input type="password" name="pswd" placeholder="Password" required="" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                            <button className="auth-btn" type="submit">Login</button>
                                        </form>
                                    </div>
                            </div>
                        </div>
                        
                  


                        )
}

export default LoginForm;




      {/* <div className="form-cont">
            <form>
                <h2>Sign In</h2>
                <label htmlFor="email">Email: </label>
                <input type="text" id="email"/><br/>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password"/><br/>
                <button onClick={() => {alert("You have logged in")}}>Submit</button>
            </form>
        </div> */}