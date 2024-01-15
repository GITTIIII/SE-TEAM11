import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import type { Dayjs } from 'dayjs';
import { Link, useNavigate } from "react-router-dom"
import { DatePicker, Form, message } from "antd"
import { useEffect, useState } from "react";
import { BookActivityInterface } from "../../../../interface/IBookActivity";
import { CreateBookActivity } from "../../../../services/https/bookActivity";
import { GetAllActivity } from '../../../../services/https/activity';
import { ActivityInterface } from '../../../../interface/IActivity';
import "../bookActivity.css"

export default function BookActivityCreate() {
    let navigate = useNavigate();
    type RangeValue = [Dayjs | null, Dayjs | null] | null;
    const { RangePicker } = DatePicker;
    const [dates, setDates] = useState<RangeValue>(null);
    const [StartDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const [Activity, setActivity] = useState<ActivityInterface[]>([])
    const [input, setInput] = useState({
        NumberOfPeople : 0,
        Comment : "",
        Phone_number : "",
        Activity : 0,
    });

    async function getActivity() {
        setActivity(await GetAllActivity());
    }

    const handdleDateChange = (
        value: DatePickerProps['value'] | RangePickerProps['value'],
        dateString: [string, string] | string,
    ) => {
        setStartDate(dateString[0]);
        setEndDate(dateString[1]);
    };

    const disabledDate = (current: Dayjs) => {
        if (!dates) {
            return false;
        }
        const tooLate = dates[0] && current.diff(dates[0], 'days') >= 1;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 0;
        return !!tooEarly || !!tooLate;
    };

    function disabledDateTime() {
        return {
            disabledHours: () => range(0, 24).splice(0,8)
        };
    }

    function range(start:any, end:any) {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    const onOpenChange = (open: boolean) => {
        if (open) {
            setDates([null, null]);
        } else {
            setDates(null);
        }
    };

    const handleInput = (e: any) => {
        setInput({
            ...input, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (values: BookActivityInterface) => {
        values.TimeStart = new Date(StartDate)
        values.TimeEnd = new Date(EndDate)
        values.NumberOfPeople = Number(input.NumberOfPeople)
        values.Phone_number = input.Phone_number
        values.Comment = input.Comment
        values.BookPlanID = 1
        values.ActivityID = Number(input.Activity)
        values.TouristID = Number(localStorage.getItem("TouristID"))
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
                content: res.message,
            });
        }
    };

    useEffect(() => { 
        getActivity()
    },[])
    

    return (
        <>
            <div className="login-bg" style={{ backgroundColor: `wheat` }}>
                {contextHolder}
                <div className="form-box">
                    <h1>จองกิจกรรม</h1>
                    <div className="book-activity-input-box">
                        <Form onFinish={handleSubmit}>
                            <label>เลือกกิจกรรม</label>
                            <div className="book-activity-input">
                                <select name="Activity" onChange={handleInput} required>
                                    <option value="none" hidden>เลือกกิจกรรม</option>
                                    {Activity.map((item, index) => (
                                    <option key={index} value={item.ID}>{item.Activity_name}</option>
                                    ))}
                                </select>
                            </div>

                            <label>เลือกวัน</label>
                            <div className="book-activity-input">
                            <RangePicker
                                onCalendarChange={(val) => {
                                    setDates(val);
                                }}
                                onOpenChange={onOpenChange}
                                disabledDate={disabledDate}
                                disabledTime={disabledDateTime}
                                minuteStep={30 as const}
                                showTime={{ format: 'HH:mm:00' }}
                                format="YYYY-MM-DD HH:mm"
                                onChange={handdleDateChange}
                            />
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
                            
                            <div className="button">
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
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}
