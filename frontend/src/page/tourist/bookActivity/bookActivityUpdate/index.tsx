import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import type { Dayjs } from 'dayjs';
import { DatePicker, Form, message } from "antd"
import { useEffect, useState , useContext} from "react";
import { BookActivityInterface } from "../../../../interface/IBookActivity";
import { GetBookActivityById, UpdateBookActivity } from "../../../../services/https/bookActivity";
import { GetAllActivity } from '../../../../services/https/activity';
import { ActivityInterface } from '../../../../interface/IActivity';
import { idBookActivity } from "../index"
import dayjs from 'dayjs';
import "../bookActivity.css"

export default function BookActivityUpdate() {
    type RangeValue = [Dayjs | null, Dayjs | null] | null;
    const { RangePicker } = DatePicker;
    const BookActivityId = useContext(idBookActivity);
    const [BookActivity, setBookActivity] = useState<BookActivityInterface[]>([])
    const [StartDate, setStartDate] = useState(Object(BookActivity).StartDate);
    const [EndDate, setEndDate] = useState(Object(BookActivity).EndDate);
    const [dates, setDates] = useState<RangeValue>(StartDate);
    const [messageApi, contextHolder] = message.useMessage();
    const [Activity, setActivity] = useState<ActivityInterface[]>([])
    const [input, setInput] = useState({
        NumberOfPeople : 0,
        Comment : "",
        Phone_number : "",
        Activity : 0,
    });

    async function getBookActivity() {
        setBookActivity(await GetBookActivityById(Number(BookActivityId)));
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

    const handleSubmit = async (values: BookActivityInterface) => {
        values.ID = Number(BookActivityId)
        values.TimeStart = new Date(StartDate)
        values.TimeEnd = new Date(EndDate)
        values.NumberOfPeople = Number(input.NumberOfPeople)
        values.Phone_number = input.Phone_number
        values.Comment = input.Comment
        // values.BookPlanID = 
        values.ActivityID = Number(input.Activity)
        values.TouristID = Number(localStorage.getItem("TouristID"))
        console.log(values)

        let res = await UpdateBookActivity(values);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "เเก้ไขข้อมูลสำเร็จ",
            });
        } else {
            messageApi.open({
                type: "error",
                content: res.message,
            });
        }
    };

    useEffect(() => { 
        getActivity()
        getBookActivity()
    },[])

    return (
        <>
                {contextHolder}
                <div className="form-box">
                    <div className="book-activity-input-box">
                        <Form onFinish={handleSubmit}>
                            <label>เลือกกิจกรรม</label>
                            <div className="book-activity-input">
                                <select name="Activity" onChange={handleInput} required>
                                    <option value="none" hidden defaultValue={Object(BookActivity).ActivityID}>{(Object(BookActivity).Activity?.Activity_name)}</option>
                                    {Activity.map((item, index) => (
                                    <option key={index} value={item.ID}>{item.Activity_name}</option>
                                    ))}
                                </select>
                            </div>

                            <label>เลือกวัน</label>
                            <div className="book-activity-input">
                            <RangePicker
                                defaultValue={[
                                    dayjs((Object(BookActivity).StartDate)),
                                    dayjs((Object(BookActivity).EndDate))
                                ]}
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
                          
                            <button type="submit">
                                <div className="activity-button">
                                    เเก้ไขข้อมูล
                                </div>
                            </button>
                        </Form>
                    </div>
                </div>
          
        </>
    )
}
