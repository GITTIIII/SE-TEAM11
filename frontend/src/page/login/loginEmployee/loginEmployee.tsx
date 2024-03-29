import "../login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons"; //for icon
import { Link, useNavigate  } from "react-router-dom";
import logo1 from "../../../asset/logo1.png"
import ship from "../../../asset/ship.jpg"
import { useState } from "react";
import { LoginPayloadInterface } from "../../../interface/ILogin";
import { LoginE } from "../../../services/https/login";
import { Form, message } from "antd";

const LoginEmployee = () => {
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

        let res = await LoginE(values);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "ล็อกอินสำเร็จ",
            });
            
            localStorage.setItem('token', res.message.token);
            localStorage.setItem('EmployeeID', res.message.id);

            setTimeout(function () {
                navigate("/employee/employeeProfile")  
            }, 500);

        } else {
            messageApi.open({
                type: "error",
                content: "ล็อกอินไม่สำเร็จ",
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
                            <h1>Sign in Employee</h1>
                        </div>
                            
                            <div className="input-box">
                                <input 
                                type="text" 
                                required
                                name="Email"
                                onChange={handleInput}
                                />
                                <label>Email Address</label>
                                <FontAwesomeIcon icon={faUser} className="icon"/>
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
                        
                            </div>
                    </Form>
                </div>
            </section>
        </>
    );
};

export default LoginEmployee;