import "../login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons"; //for icon
import { Link, useNavigate  } from "react-router-dom";
import logo1 from "../../../asset/logo1.png"
import ship from "../../../asset/ship.jpg"
import { useState } from "react";
import { LoginT } from "../../../services/https/login";
import { LoginPayloadInterface } from "../../../interface/ILogin";
import { Form, message } from "antd";

const LoginTourist = () => {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [input, setInput] = useState({
        Email: "",
        Password: "",
    });
    
    const handleInput = (e: any) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (values: LoginPayloadInterface) => {
        values.Email = input.Email
        values.Password = input.Password

        let res = await LoginT(values);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "ล็อกอินสำเร็จ",
            });
            
            localStorage.setItem('token', res.message.token);
            localStorage.setItem('TouristID', res.message.id);

            setTimeout(function () {
                navigate("/tourist/main")  
            }, 500);

        } else {
            messageApi.open({
                type: "error",
                content: res.message,
            });
        }
    } 

    return (
        <>
            <section className="login-bg" style={{ backgroundImage: `url(${ship})` }}>
                {contextHolder}
                <div className="login-box">
                    <Form onFinish={handleSubmit}>

                        <div className="icon">
                            <img src={logo1} alt="logo"/>
                            <h1>Sign in</h1>
                        </div>
                            
                            <div className="input-box">
                                <input 
                                type="text" 
                                required
                                name="Email"
                                onChange={handleInput}
                                />
                                <FontAwesomeIcon icon={faUser} className="icon"/>
                                <label>Email Address</label>
                            </div>

                            <div className="input-box">
                                <input 
                                type="password" 
                                required
                                name="Password"
                                onChange={handleInput}
                                />
                                <label>Password</label>
                                <FontAwesomeIcon icon={faLock} className="icon"/>
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

export default LoginTourist;