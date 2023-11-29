import "./login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons"; //for icon
import { Form, Link } from "react-router-dom";
import logo1 from "../../asset/logo1.png"
import ship from "../../asset/ship.jpg"
import { useState } from "react";

const Login = () => {
    const [input, setInput] = useState({
        Username: "",
        Password: "",
    });

    const handleInput = (e:any) =>{
        setInput({...input,[e.target.name] : [e.target.value]});
    
    }

    const login = async () => {
        
    

    }

    return (
        <>
            <section className="login-bg" style={{ backgroundImage: `url(${ship})` }}>
                <div className="login-box">
                    <Form onFinish={login}>
                        <div className="icon">
                            <img src={logo1} alt="logo"/>
                            <h1>Sign in</h1>
                        </div>
                            
                            <div className="input-box">
                                <input 
                                type="text" 
                                required 
                                onChange={handleInput}
                                />
                                <label>Email Address</label>
                                <FontAwesomeIcon icon={faUser} className="icon"/>
                            </div>

                            <div className="input-box">
                                <input 
                                type="password" 
                                required
                                onChange={handleInput}
                                />
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

                                <button type="submit">Sign in</button> 
                                <Link to="register">Create an account</Link>
                        
                            </div>
                    </Form>
                </div>
            </section>
        </>
    );
};

export default Login;

function useStyles() {
    throw new Error("Function not implemented.");
}
