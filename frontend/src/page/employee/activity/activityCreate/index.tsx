import { Form, message } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ActivityInterface } from '../../../../interface/IActivity';
import { CreateActivity } from '../../../../services/https/activity';

export default function ActivityCreate() {
    let navigate = useNavigate();
    const [messageApi, contextHolder] = message.useMessage();
    const [input, setInput] = useState({
        Activity_name : ""
    });

    const handleInput = (e: any) => {
        setInput({
        ...input,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (values: ActivityInterface) => {
        values.Acticity_name = input.Activity_name
        console.log(values)

        let res = await CreateActivity(values);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "บันทึกข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                navigate("/employee/activity");
            }, 2000);
        } else {
            messageApi.open({
                type: "error",
                content: "บันทึกข้อมูลไม่สำเร็จ",
            });
        }
    };

    return (
        <div className="activity-box">
            {contextHolder}
        <label>Activity</label>
        <div className="activity-form">
            <Form onFinish={handleSubmit}>
            <input 
            type="text"
            name="Acticity_name" 
            required
            onChange={handleInput}
            />
            </Form>
        </div>
        <button type='submit'>ยืนยัน</button>
        </div>
    )
}
