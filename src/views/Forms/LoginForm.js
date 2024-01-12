import { useState } from "react";
import "./LoginForm.css"
import axios from "axios";

const LoginForm = () => {

    const [name,setName] = useState("")
    const [password, setPassword] = useState("");
    const [email,setEmail] = useState("")

    const loginForm = (e)=>{
        e.preventDefault();
        const sendData = {
            name:name,
            password:password
        } 
        axios.post("http://localhost:8000/login", sendData).then((res)=>{
            console.log(res)

            localStorage.setItem("token",res.data.access_token)
            localStorage.setItem("id",res.data.id)

        })


    }

    return (
        <div className="login-cont">
            <div class="main">
                <input type="checkbox" id="chk" aria-hidden="true" />

                <div class="signup">
                    <form>
                        <label for="chk" aria-hidden="true">Sign up</label>
                        <input type="text" name="txt" placeholder="User name" required=""/>
                            <input type="email" name="email" placeholder="Email" required=""/>
                                <input type="password" name="pswd" placeholder="Password" required=""/>
                                    <button className="auth-btn">Sign up</button>
                                </form>
                            </div>

                            <div class="login">
                                <form className="loginForm">
                                    <label for="chk" aria-hidden="true">Login</label>
                                    <input type="email" name="email" placeholder="Email" value={email} required onChange={(e) => setEmail(e.target.value)}/>
                                        <input type="password" name="pswd" placeholder="Password" required="" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                            <button className="auth-btn">Login</button>
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