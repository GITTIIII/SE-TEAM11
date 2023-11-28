import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons"; //for icon
import { Form, Link, useNavigate } from "react-router-dom";
import logo1 from "../../asset/logo1.png"
import ship from "../../asset/ship.jpg"
import { useState } from "react";
import { message } from "antd";

const Login = () => {
    let navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [input, setInput] = useState({
        Username: "",
        Password: "",
    });

    return (
        <>
        <section className="login-bg" style={{ backgroundImage: `url(${ship})` }}>
            {contextHolder}
            <div className="login-box">
                <Form>

                    <div className="icon">
                        <img src={logo1} alt="logo"/>
                        <h1>Sign in</h1>
                    </div>
                        
                        <div className="input-box">
                            <input type="text" required/>
                            <label>Email Address</label>
                            <FontAwesomeIcon icon={faUser} className="icon"/>
                        </div>

                        <div className="input-box">
                            <input type="password" required/>
                            <label>Password</label>
                            <FontAwesomeIcon icon={faLock} className="icon"/>
                        </div>
                        
                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox"/>
                                Stay signed in
                            </label>
                            <Link to="/">Forgot Password?</Link>
                        </div>
                        <div className="buttom-area">
                            <div className="login-button">
                                <button type="submit">Sign in</button> 
                            </div>
                            <Link to="register">Create an account</Link>
                    
                        </div>
                    </Form>
                </div>
            </section>
        </>
    );
};

export default Login;