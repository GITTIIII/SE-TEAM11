import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import type { Dayjs } from 'dayjs';
import { DatePicker, Form, message } from "antd"
import { useEffect, useState , useContext} from "react";
import { BookActivityInterface } from "../../../../interface/IBookActivity";
import { GetBookActivityById, UpdateBookActivity } from "../../../../services/https/bookActivity";
import { GetAllActivity } from '../../../../services/https/activity';
import { ActivityInterface } from '../../../../interface/IActivity';
import { idBookActivity } from "../index"
import "../bookActivity.css"

export default function BookActivityUpdate() {
    const dateFormat = 'YYYY/MM/DD HH:mm';
    type RangeValue = [Dayjs | null, Dayjs | null] | null;
    const { RangePicker } = DatePicker;
    const BookActivityId = useContext(idBookActivity);
    const [BookActivity, setBookActivity] = useState<BookActivityInterface>({})
    const [StartDate, setStartDate] = useState("");
    const [EndDate, setEndDate] = useState("");
    const [dates, setDates] = useState<RangeValue>();
    const [messageApi, contextHolder] = message.useMessage();
    const [Activity, setActivity] = useState<ActivityInterface[]>([])
    const [input, setInput] = useState({} as BookActivityInterface);

    async function getBookActivity() {
        const data = await GetBookActivityById(Number(BookActivityId));
        setBookActivity(data);
        setInput(data);
    }

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

    const handleSubmit = async () => {
        let updatedValues: BookActivityInterface =  {
            ID: Number(BookActivityId),
            TimeStart: new Date(StartDate),
            TimeEnd: new Date(EndDate),
            NumberOfPeople: Number(input.NumberOfPeople),
            Comment: input.Comment,
            Phone_number: input.Phone_number,
            BookPlanID: 1,
            TouristID: Number(localStorage.getItem("TouristID")),
            ActivityID: Number(input.ActivityID)
        }
        
        console.log(updatedValues);
        let res = await UpdateBookActivity(updatedValues);
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

    useEffect(() => { 
        getActivity()
        getBookActivity()
    },[])

    return (
        <>
                {contextHolder}
                    <div className="book-activity-form-box">
                        <Form onFinish={handleSubmit}>
                            <label>เลือกกิจกรรม</label>
                            <div className="book-activity-input">
                                <select name="ActivityID" onChange={handleInput} required>
                                    <option value="none" hidden defaultValue={Number(Object(BookActivity).ActivityID)}>{(Object(BookActivity).Activity?.Activity_name)}</option>
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
                                format={dateFormat}
                                onChange={handdleDateChange}
                            />
                            </div>

                            <label>ระบุจำนวนคน</label>
                            <div className="book-activity-input">
                                <input 
                                type="number" 
                                min={3} 
                                max={10}
                                name="NumberOfPeople"
                                defaultValue={Object(BookActivity).NumberOfPeople}
                                onChange={handleInput}
                                />
                            </div>

                            <label>กรอกเบอร์โทร</label>
                            <div className="book-activity-input">
                                <input 
                                type="text" 
                                name="Phone_number"
                                defaultValue={Object(BookActivity).Phone_number}
                                onChange={handleInput}
                                />
                            </div>

                            <label>ระบุความเห็น</label>
                            <div className="book-activity-input">
                                <input 
                                type="textarea" 
                                name="Comment"
                                defaultValue={Object(BookActivity).Comment}
                                onChange={handleInput}
                                />
                            </div>
                    
                            
                            <button className="activity-button" type='submit'>
                                เเก้ไขข้อมูล
                            </button>
                            
                        </Form>
                    </div>
                
        </>
    )
}
