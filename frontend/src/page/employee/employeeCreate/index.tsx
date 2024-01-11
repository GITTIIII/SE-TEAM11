import { Link, useNavigate } from "react-router-dom";
//import logo1 from "../../asset/logo1.png"
// import login from "../../asset/login.jpg"
import { useState } from "react";
import { EmployeeInterface } from "../../../interface/IEmployee";
import { CreateEmployee } from "../../../services/https/employee";
import { Form, message } from "antd";
import Swal from 'sweetalert2'


//import "./register.css"
//import "../login/login.css"


const Register = () => {
    let navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [input, setInput] = useState({
        Email: "",
        Password: "",
        Name: "",
        Tel: "",
        Age: 0,
        Gender: "",
    });

    const handleInput = (e: any) => {
        setInput({
            ...input, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (values: EmployeeInterface) => {
        values.Email = input.Email
        values.Password = input.Password
        values.Name = input.Name
        values.Tel = input.Tel
        values.Gender = input.Gender
        values.Picture = ""
        console.log(values)

        let res = await CreateEmployee(values);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "บันทึกข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                navigate("/");
            }, 2000);
        } else {
            Swal.fire({
              title: 'รูปแบบอีเมลล์ไม่ถูกต้อง',
              text: res.message,
              icon: 'error',
            });
        }
    };

    return (
        <>

        <section className="register-bg" >
            <div className="login-box">
                {contextHolder}
                <Form onFinish={handleSubmit}>
                    <div className="icon">
                        {/* <img src={logo1} alt="logo"/> */}
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
                            name="Name"
                            onChange={handleInput}
                            required/>
                            <label>Name</label>
                        </div>

                        <div className="input-box">
                            <input 
                            type="text" 
                            name="Tel"
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