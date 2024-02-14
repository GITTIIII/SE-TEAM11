import { DatePicker, Form, message } from "antd"
import { useEffect, useState , useContext} from "react";
import { BookActivityInterface } from "../../../../interface/IBookActivity";
import { GetBookActivityById, UpdateBookActivity } from "../../../../services/https/bookActivity";
import { GetAllActivity } from '../../../../services/https/activity';
import { ActivityInterface } from '../../../../interface/IActivity';
import { idBookActivity } from "../index"
import dayjs from "dayjs";
import "../bookActivity.css"

export default function BookActivityUpdate({onCancel}:{onCancel:()=>void}) {
    const BookActivityId = useContext(idBookActivity);
    const [BookActivity, setBookActivity] = useState<BookActivityInterface>({})
    const [rDate, setRDate] = useState<any>(dayjs());
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

    const handleDateChange = (date: dayjs.Dayjs | null, dateString: string) => {
        console.log(date);
        setRDate(date);
    };

    const handleInput = (e: any) => {
        setInput({
            ...input, [e.target.name]: e.target.value});
    };

    const handleSubmit = async () => {
        let updatedValues: BookActivityInterface =  {
            ID: Number(BookActivityId),
            Date: new Date(rDate),
            Time: input.Time,
            NumberOfPeople: Number(input.NumberOfPeople),
            Comment: input.Comment,
            Phone_number: input.Phone_number,
            BookPlanID: 1,
            ActivityID: Number(input.Activity),
            TouristID: Number(localStorage.getItem("TouristID")),
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
                    <div className="book-activity-update-form-box">
                        <div className="updatePopup-top">
                            <label>เเก้ไขข้อมูล</label>
                        </div>
                        <Form>
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
                            <DatePicker
                                value={rDate}
                                onChange={handleDateChange}
                                format="YYYY-MM-DD"
                            />
                            </div>

                            <label>เลือกเวลา</label>
                            <div className="book-activity-input">
                                <select name="Time" onChange={handleInput} required>
                                    <option value="none" hidden>{Object(BookActivity).Time}</option>
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
                                min={1} 
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
                            
                            <div className="book-activity-button">
                                <button className="cancel-button" onClick={onCancel}>
                                    <label>ยกเลิก</label>
                                </button>         
                                <button className="update-button" type='submit' onClick={handleSubmit}>
                                    <label>ยืนยัน</label>
                                </button>
                            </div>
                        </Form>
                    </div>
                
        </>
    )
}
