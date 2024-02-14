import { Link, useLocation, useNavigate } from "react-router-dom"
import { DatePicker, Form, message } from "antd"
import { useEffect, useState } from "react";
import { BookActivityInterface } from "../../../../interface/IBookActivity";
import { CreateBookActivity } from "../../../../services/https/bookActivity";
import { GetActivityById, GetAllActivity } from '../../../../services/https/activity';
import { ActivityInterface } from '../../../../interface/IActivity';

import ship1 from "../../../../asset/ship1.jpg"
import dayjs from "dayjs";
import "../bookActivity.css"

export default function BookActivityCreate() {
    let navigate = useNavigate();
    const {state} = useLocation()
    const [rDate, setRDate] = useState<any>(dayjs());
    const [messageApi, contextHolder] = message.useMessage();
    const [Activity, setActivity] = useState<ActivityInterface>()
    const [AllActivity, setAllActivity] = useState<ActivityInterface[]>([])
    const [input, setInput] = useState({} as BookActivityInterface);

    async function getActivity() {
        setAllActivity(await GetAllActivity());
        if(state !== null){
            setActivity(await GetActivityById(state));
        }
    }

    const handleDateChange = (date: dayjs.Dayjs | null, dateString: string) => {
        setRDate(date);
    };

    const handleInput = (e: any) => {
        setInput({
            ...input, [e.target.name]: e.target.value});
        console.log(input);
    };

    const handleSubmit = async () => {
        input.Activity = input.Activity === undefined ? state : input.Activity;
        let createValues: BookActivityInterface =  {
            Date: new Date(rDate),
            Time: input.Time,
            NumberOfPeople: Number(input.NumberOfPeople),
            Comment: input.Comment,
            Phone_number: input.Phone_number,
            BookPlanID: 1,
            ActivityID: Number(input.Activity),
            TouristID: Number(localStorage.getItem("TouristID")),
        }
        
        let res = await CreateBookActivity(createValues);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "บันทึกข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                navigate("/tourist/bookActivity");
            }, 1000);
        } else {
            messageApi.open({
                type: "error",
                content: res.message,
            });
        }
    };

    useEffect(() => { 
        getActivity()
    },[])

    return (
        <>
            <div className="login-bg" style={{ backgroundImage: `url(${ship1})` }}>
                {contextHolder}
                        <h1>จองกิจกรรม</h1>
                        <div className="book-activity-form-box">
                            <Form>
                                <label>เลือกกิจกรรม</label>
                                <div className="book-activity-input">
                                    <select name="Activity" onChange={handleInput} required>
                                        <option value="none" hidden>{state !== null ? Activity?.Activity_name : "เลือกกิจกรรม"}</option>
                                        {AllActivity.map((item, index) => (
                                        <option key={index} value={item.ID}>{item.Activity_name}</option>
                                        ))}
                                    </select>
                                </div>

                                <label>เลือกวัน</label>
                                <div className="book-activity-input">
                                <DatePicker
                                    value={rDate}
                                    onChange={handleDateChange}
                                    format="YYYY-MM-DD"
                                />
                                </div>
                                
                                <label>เลือกเวลา</label>
                                <div className="book-activity-input">
                                    <select name="Time" onChange={handleInput} required>
                                        <option value="none" hidden>เลือกเวลา</option>
                                        <option value="8.00-10.00">{"8.00-10.00"}</option>
                                        <option value="10.00-12.00">{"10.00-12.00"}</option>
                                        <option value="12.00-14.00">{"12.00-14.00"}</option>
                                        <option value="14.00-16.00">{"14.00-16.00"}</option>
                                        <option value="16.00-18.00">{"16.00-18.00"}</option>
                                        <option value="18.00-20.00">{"18.00-20.00"}</option>
                                        <option value="20.00-22.00">{"20.00-22.00"}</option>
                                    </select>
                                </div>

                                <label>ระบุจำนวนคน</label>
                                <div className="book-activity-input">
                                    <input 
                                    type="number" 
                                    name="NumberOfPeople"
                                    onChange={handleInput}
                                    />
                                </div>

                                <label>กรอกเบอร์โทร</label>
                                <div className="book-activity-input">
                                    <input 
                                    type="text" 
                                    name="Phone_number"
                                    onChange={handleInput}
                                    />
                                </div>

                                <label>ระบุความเห็น</label>
                                <div className="book-activity-input">
                                    <input 
                                    type="textarea" 
                                    name="Comment"
                                    onChange={handleInput}
                                    />
                                </div>
                                
                                <div className="book-activity-button">
                                    <Link to="/tourist/bookActivity">
                                        <button className="cancel-button">
                                            <label>ย้อนกลับ</label>
                                        </button>
                                    </Link>

                                    <button className="update-button" type="submit" onClick={handleSubmit}>
                                        <label>ยืนยัน</label>
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>
        </>
    )
}