import { Form, Link } from "react-router-dom"
import { DatePicker } from "antd"
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';
import "../bookActivity.css"
export default function BookActivityCreate() {
    const range = (start: number, end: number) => {
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    };

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        // Can not select days before today and today
        return current && current < dayjs().endOf('day');
    };

    const disabledDateTime = () => ({
        disabledHours: () => range(0, 24).splice(4, 20),
        disabledMinutes: () =>  range(0, 24).splice(4, 20),
    });

    return (
        <>
            <div className="login-bg" style={{ backgroundColor: `white` }}>
                <div className="form-box">
                    <h1>จองกิจกรรม</h1>
                    <div className="activity-input-box">
                        <Form>
                            <DatePicker format="YYYY-MM-DD HH:mm" disabledDate={disabledDate}/>
                            <div className="activity-input">
                                <input type="number" min={3} max={10}/>
                            </div>
                            <div className="activity-input">
                                <input type="textarea" />
                            </div>
                            <div className="activity-input">
                                <input type="text" />
                            </div>
                        </Form>
                    <Link to="/tourist/bookActivity">
                        <div className="activity-button">
                            ย้อนกลับ
                        </div>
                    </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
