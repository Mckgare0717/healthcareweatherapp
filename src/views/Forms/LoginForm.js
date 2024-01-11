import "./LoginForm.css"

const LoginForm = () => {
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
                                    <input type="email" name="email" placeholder="Email" required=""/>
                                        <input type="password" name="pswd" placeholder="Password" required=""/>
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