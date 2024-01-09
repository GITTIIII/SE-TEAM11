import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { Link, useNavigate } from "react-router-dom"
import { DatePicker, Form, message } from "antd"
import { useState } from "react";
import { BookActivityInterface } from "../../../../interface/IBookActivity";
import { CreateBookActivity } from "../../../../services/https/bookActivity";
import "../bookActivity.css"

export default function BookActivityCreate() {
    let navigate = useNavigate();
    const { RangePicker } = DatePicker;
    const [StartDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const [input, setInput] = useState({
        NumberOfPeople : 0,
        Comment : "",
        Phone_number : ""
    });

    const onDateChange = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string,
    ) => {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        setStartDate(dateString[0]);
        setEndDate(dateString[1]);
    };

    const handleInput = (e: any) => {
        setInput({
            ...input, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (values: BookActivityInterface) => {
        values.TimeStart = StartDate  + ":00"
        values.TimeEnd = EndDate + ":00"
        values.NumberOfPeople = input.NumberOfPeople
        values.Phone_number = input.Phone_number
        values.Comment = input.Comment
        console.log(values)

        let res = await CreateBookActivity(values);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "บันทึกข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                navigate("/tourist/bookActivity");
            }, 500);
        } else {
            messageApi.open({
                type: "error",
                content: "บันทึกข้อมูลไม่สำเร็จ",
            });
        }
    };

    return (
        <>
            <div className="login-bg" style={{ backgroundColor: `wheat` }}>
                {contextHolder}
                <div className="form-box">
                    <h1>จองกิจกรรม</h1>
                    <div className="activity-input-box">
                        <Form onFinish={handleSubmit}>
                            <label>เลือกวัน</label>
                            <div className="activity-input">
                            <RangePicker
                                showTime={{ format: 'HH:mm:00' }}
                                format="YYYY-MM-DD HH:mm"
                                onChange={onDateChange}
                            />
                            </div>

                            <label>ระบุจำนวนคน</label>
                            <div className="activity-input">
                                <input 
                                type="number" 
                                min={3} 
                                max={10}
                                name="NumberOfPeople"
                                onChange={handleInput}
                                />
                            </div>

                            <label>กรอกเบอร์โทร</label>
                            <div className="activity-input">
                                <input 
                                type="text" 
                                name="Phone_number"
                                onChange={handleInput}
                                />
                            </div>

                            <label>ระบุความเห็น</label>
                            <div className="activity-input">
                                <input 
                                type="textarea" 
                                name="Comment"
                                onChange={handleInput}
                                />
                            </div>
                            
                            <Link to="/tourist/bookActivity">
                                <div className="activity-button">
                                    ย้อนกลับ
                                </div>
                            </Link>

                            <button type="submit">
                                <div className="activity-button">
                                    ยืนยัน
                                </div>
                            </button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}
