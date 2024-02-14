import { Link, useNavigate } from "react-router-dom";
import logo1 from "../../../asset/logo1.png"
import login from "../../../asset/login.jpg"
import { useEffect, useState } from "react";
import type { UploadProps } from 'antd/es/upload/interface';
import { EmployeeInterface } from "../../../interface/IEmployee";
import { GendersInterface } from "../../../interface/IGender";
import { AreaCodesInterface } from "../../../interface/IAreaCode";
import { EmployeeRoleInterface } from "../../../interface/IEmployeeRole";
import { CreateEmployee, GetAllAreaCode, GetAllGender } from "../../../services/https/employee";
import { GetAllEmployeeRole } from "../../../services/https/employeeRole";
import { Form, message, Upload, Button } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import "./employeeCreate.css"


export default function RegisterEmployee() {

    const [messageApi, contextHolder] = message.useMessage();
    let navigate = useNavigate();
    const [picture, setPicture] = useState("");

    const EmployeeRoleID = localStorage.getItem("EmployeeRoleID");

    const [input, setInput] = useState({
        Email: "",
        Password: "",
        Name: "",
        Tel: "",
        Age: 0,
        GenderID: 0,
        AreaCodeID: 0,
        EmployeeRoleID: 0,
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
        values.Age = Number(input.Age)
        values.GenderID = Number(input.GenderID)
        values.AreaCodeID = Number(input.AreaCodeID)
        values.Picture = picture
        values.EmployeeRoleID = Number(input.EmployeeRoleID)
        console.log(values)



        let res = await CreateEmployee(values);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "บันทึกข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                navigate("/employee");
            }, 2000);
        } else {
            messageApi.open({
                type: "error",
                content: res.message,
            });

            // Swal.fire({
            //     title: 'บันทึกข้อมูลไม่สำเร็จ',
            //     text: res.message,
            //     icon: 'error',
            // });

        }
    };

    const [genders, setGender] = useState<GendersInterface[]>([]);
    const getGender = async () => {
        let res = await GetAllGender();
        if (res) {
            setGender(res);
        }
    };

    useEffect(() => {
        getGender();
    }, []);

    const [areaCode, setAreaCode] = useState<AreaCodesInterface[]>([]);
    const getAreaCode = async () => {
        let res = await GetAllAreaCode();
        if (res) {
            setAreaCode(res);
        }
    };

    useEffect(() => {
        getAreaCode();
    }, []);

    const [empRole, setEmpRole] = useState<EmployeeRoleInterface[]>([]);
    const getEmpRole = async () => {
        let res = await GetAllEmployeeRole();
        if (res) {
            setEmpRole(res);
        }
    };

    useEffect(() => {
        getEmpRole();
    }, []);

    const props: UploadProps = {

        beforeUpload: (file) => {
            const reader = new FileReader();

            reader.onload = (e) => {
                if (e.target) {
                    const base64Image = e.target.result as string; // Ensure it's a string
                    // นำ base64Image ไปใช้ในการบันทึกรูปภาพลงใน entity
                    setPicture(base64Image); // ตั้งค่า state สำหรับเก็บรูปภาพ
                }
            };

            reader.readAsDataURL(file);
            return false; // Prevent automatic upload
        },
        onChange: (info) => {
            console.log(info.fileList);
        },
    };



    return (
        <div className="register-bg" style={{ backgroundImage: `url(${login})` }}>
            <div className="login-box">
                {contextHolder}
                <Form onFinish={handleSubmit}>
                    <div className="icon">
                        <img src={logo1} alt="logo" />
                        <h2>ลงทะเบียนลูกเรือ</h2>
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            name="Email"
                            onChange={handleInput}
                        />
                        <label>อีเมลล์</label>
                    </div>

                    <div className="input-box">
                        <input
                            type="password"
                            name="Password"
                            onChange={handleInput}
                            required />
                        <label>รหัสผ่าน</label>
                    </div>

                    <div className="create-employee-select-box">
                        <select name="EmployeeRoleID" onChange={handleInput} >
                            <option value="" disabled selected>ตำแหน่ง</option>
                            {empRole.map((item) => (
                                <option value={item.ID} key={item.Name}>{item.Name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            name="Name"
                            onChange={handleInput}
                            required />
                        <label>ชื่อ</label>
                    </div>

                    <div className="create-employee-select-box">
                        <select name="AreaCodeID" onChange={handleInput} >
                            <option value="" disabled selected>AreaCode</option>
                            {areaCode.map((item) => (
                                <option value={item.ID} key={item.Name}>{item.Name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-box">
                        <input
                            type="text"
                            name="Tel"
                            onChange={handleInput}
                            required />
                        <label>เบอร์โทร</label>
                    </div>

                    <div className="input-box">
                        <input
                            type="number"
                            name="Age"
                            onChange={handleInput}
                            min={18}
                            max={100}
                            required />
                        <label>อายุ</label>
                    </div>

                    <div className="create-employee-select-box">
                        <select name="GenderID" onChange={handleInput} >
                            <option value="" disabled selected>เพศ</option>
                            {genders.map((item) => (
                                <option value={item.ID} key={item.Name}>{item.Name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="create-employee-text-bold">
                        <label className="create-employee-text-bold">รูปภาพลูกเรือ</label>
                        <br></br>
                        <Upload {...props}
                            accept='image/png, image/jpeg'
                            action="/Employee"
                            id="picture"
                        >
                            <Button className="create-employee-text-bold" icon={<UploadOutlined />}>คลิกเพื่อเลือกรูปภาพ</Button>
                        </Upload>
                    </div>

                    <div className="buttom-area">
                        <div className="login-button">
                            <button type="submit">ลงทะเบียน</button>
                        </div>
                        {/* <Link to="/login/employee">Have Account?</Link> */}

                    </div>
                </Form>
            </div>
        </div>
    );
};
