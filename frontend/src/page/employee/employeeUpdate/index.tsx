import { useNavigate } from "react-router-dom";
import { ChangeEvent, useEffect, useState, useContext } from "react";
import { employeeIDContext } from "..";
import { EmployeeRoleInterface } from "../../../interface/IEmployeeRole";
import { EmployeeInterface } from "../../../interface/IEmployee";
import { GendersInterface } from "../../../interface/IGender";
import { AreaCodesInterface } from "../../../interface/IAreaCode";
import { GetAllEmployeeRole } from "../../../services/https/employeeRole";
import { GetAllAreaCode, GetAllGender, GetEmployeeById, UpdateEmployee } from "../../../services/https/employee";
import { Form, message, Button } from "antd";
import { CloseOutlined} from '@ant-design/icons';

import "./employeeUpdate.css"







export default function EditEmployee({ onCancel }: { onCancel: () => void }) {
    const navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [employee, setEmployee] = useState<EmployeeInterface>();
    const [areaCodes, setAreaCodes] = useState<AreaCodesInterface[]>([]);
    const [genders, setGenders] = useState<GendersInterface[]>([]);
    const [picture, setPicture] = useState("");
    const [input, setInput] = useState({} as EmployeeInterface);
    const EmployeeID = useContext(employeeIDContext);

    const getAreaCode = async () => {
        let res = await GetAllAreaCode();
        if (res) {
            setAreaCodes(res);
        }
    };

    const getGender = async () => {
        let res = await GetAllGender();
        if (res) {
            setGenders(res);
        }
    };

    const getEmployeeById = async () => {
        let res = await GetEmployeeById(Number(EmployeeID));
        setEmployee(res);
        setInput(res);
    };

    useEffect(() => {
        getAreaCode();
        getGender();
        getEmployeeById();
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

    const handleInput = (e: any) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string; // Type assertion to string
                // เปลี่ยน setImage เพื่อทำการใช้ base64String
                setPicture(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        let updatedValues: EmployeeInterface = {
            ID: Number(EmployeeID),
            Email: input.Email,
            Password: input.Password,
            Name: input.Name,
            Tel: input.Tel,
            Age: input.Age,
            Picture: picture,
            AreaCodeID: Number(input.AreaCodeID),
            GenderID: Number(input.GenderID),
            EmployeeRoleID: Number(input.EmployeeRoleID),
        };

        console.log(updatedValues);
        console.log(input);
        let res = await UpdateEmployee(updatedValues);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "เเก้ไขข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                window.location.reload();
            }, 500);
        } else {
            messageApi.open({
                type: "error",
                content: res.message,
            });
            console.log(res.message);
        }
    };

    return (
        <>
            <div className="update-employee">
                {contextHolder}
                <div className="update-employee-header">
                    <h1>แก้ไขข้อมูลลูกเรือ</h1>
                </div>
                <div className="update-employee-close-button">
                    <Button type="text" icon={<CloseOutlined />} onClick={onCancel} />
                </div>

                

                <div className="update-employee-form">
                    <Form onFinish={handleSubmit}>
                        <label>Email</label>
                        <input
                            className="update-employee-input"
                            placeholder="Enter Email"
                            name="Email"
                            defaultValue={Object(employee).Email}
                            onChange={handleInput}
                            required
                        />
                        <br />

                        <label>Password</label>
                        <input
                            className="update-employee-input"
                            placeholder="Enter Password"
                            type="password"
                            name="Password"
                            onChange={handleInput}
                            required
                        />
                        <br />

                        <label>Role</label>
                        <select
                            className="update-employee-select-custom"
                            name="EmployeeRoleID"
                            onChange={handleInput}>
                            <option
                                value="none"
                                hidden
                                defaultValue={Number(Object(employee).EmployeeRoleID)}
                            >
                                {Object(employee).EmployeeRole?.EmployeeRoleID}
                            </option>
                            {empRole.map((item) => (
                                <option value={item.ID} key={item.Name}>
                                    {item.Name}
                                </option>
                            ))}
                        </select>


                        <label>Name</label>
                        <input
                            className="update-employee-input"
                            placeholder="Enter Name"
                            name="Name"
                            defaultValue={Object(employee).Name}
                            onChange={handleInput}
                            required
                        />
                        <br />

                        <label>AreaCode</label>
                        <select
                            className="update-employee-select-custom"
                            name="AreaCodeID"
                            onChange={handleInput}>
                            <option
                                value="none"
                                hidden
                                defaultValue={Number(Object(employee).AreaCodeID)}
                            >
                                {Object(employee).AreaCode?.AreaCodeID}
                            </option>
                            {areaCodes.map((item) => (
                                <option value={item.ID} key={item.Name}>
                                    {item.Name}
                                </option>
                            ))}
                        </select>

                        <label>Phone</label>
                        <br></br>
                        <input
                            className='update-employee-input'
                            type="number"
                            placeholder='ระบุเบอร์โทร'
                            name="Tel"
                            defaultValue={Object(employee).Tel}
                            onChange={handleInput}
                            required
                        />

                        <label>Age</label>
                        <br></br>
                        <input
                            className='update-employee-input'
                            type="number"
                            placeholder='ระบุอายุ'
                            name="Age"
                            defaultValue={Object(employee).Age}
                            onChange={handleInput}
                            required
                        />
                        <br />

                        <label>Sex</label>
                        <select
                            className="update-employee-select-custom"
                            name="Gender"
                            onChange={handleInput}>
                            <option
                                value="none"
                                hidden
                                defaultValue={Number(Object(employee).GenderID)}
                            >
                                {Object(employee).Gender?.GenderID}
                            </option>
                            {genders.map((item) => (
                                <option value={item.ID} key={item.Name}>
                                    {item.Name}
                                </option>
                            ))}
                        </select>
                        
                        <label>รูปภาพลูกเรือ</label>
                        <br></br>
                        <input
                            className="update-employee-form-info"
                            id="Picture"
                            type="file"
                            accept="image/*"
                            name="Picture"
                            onChange={handleImageChange}
                        />
                        <br />

                        <div className="update-employee-button-area">
                            <button type="submit">ยืนยัน</button>
                        </div>
                    </Form>
                </div>

            </div>
        </>
    )

}
