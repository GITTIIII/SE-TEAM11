import { Link, useNavigate } from "react-router-dom";
import logo1 from "../../asset/logo1.png"
import login from "../../asset/login.jpg"
import { useState } from "react";
import { TouristInterface } from "../../interface/ITourist";
import { CreateTourist } from "../../services/https/tourist";
import { Form, message } from "antd";

import "./register.css"
import "../login/login.css"


const Register = () => {
    let navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [input, setInput] = useState({
        Email: "",
        Password: "",
        Tourist_name: "",
        Phone: "",
        Age: 0,
        Gender: "",
    });

    const handleInput = (e: any) => {
        setInput({
            ...input, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (values: TouristInterface) => {
        values.Email = input.Email
        values.Password = input.Password
        values.Tourist_name = input.Tourist_name
        values.Phone = input.Phone
        values.Age = Number(input.Age)
        values.Gender = input.Gender
        values.Picture = ""
        console.log(values)

        let res = await CreateTourist(values);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "บันทึกข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                navigate("/");
            }, 2000);
        } else {
            messageApi.open({
                type: "error",
                content: "บันทึกข้อมูลไม่สำเร็จ",
            });
        }
    };

    return (
        <>
        <section className="register-bg" style={{ backgroundImage: `url(${login})` }}>
            <div className="login-box">
                {contextHolder}
                <Form onFinish={handleSubmit}>
                    <div className="icon">
                        <img src={logo1} alt="logo"/>
                        <h2>Register</h2>
                    </div>

                        <div className="input-box">
                            <input 
                            type="text" 
                            name="Email"
                            onChange={handleInput}
                            required/>
                            <label>Email Address</label>
                        </div>

                        <div className="input-box">
                            <input 
                            type="password" 
                            name="Password"
                            onChange={handleInput}
                            required/>
                            <label>Password</label>
                        </div>

                        <div className="input-box">
                            <input 
                            type="text" 
                            name="Tourist_name"
                            onChange={handleInput}
                            required/>
                            <label>Name</label>
                        </div>

                        <div className="input-box">
                            <input 
                            type="text" 
                            name="Phone"
                            onChange={handleInput}
                            required/>
                            <label>Phone</label>
                        </div>

                        <div className="input-box">
                            <input 
                            type="number" 
                            name="Age"
                            onChange={handleInput}
                            min={18}
                            max={100}
                            required/>
                            <label>Age</label>
                        </div>

                        <div className="input-box">
                            <select name="Gender" onChange={handleInput}>
                                <option value="none" hidden>Sex</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>                           
                     
                        <div className="buttom-area">
                            <div className="login-button">
                            <button type="submit">Sign up</button> 
                            </div>
                            <Link to="/">Have Account?</Link>
                    
                        </div>
                </Form>
            </div>
        </section>
    </>
  );
};

export default Register;