import { Form, Link } from "react-router-dom"
import ship from "../../../../asset/ship.jpg"
import { DatePicker, TimePicker } from "antd"
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker';

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
            <div className="login-bg" style={{ backgroundColor: `black` }}>
                <div className="form-box">
                    <h1>จองกิจกรรม</h1>
                    <Form>
                    <DatePicker
                        format="YYYY-MM-DD HH:mm"
                        disabledDate={disabledDate}
                    />
                    <TimePicker defaultValue={dayjs('00:00')} format={'HH:mm'} minuteStep={30}/>
                    <TimePicker secondStep={56} minuteStep={30} hourStep={4} />;
                    </Form>
                </div>
                <Link to="/tourist/bookActivity">
                    <div className="activity-button">
                        ย้อนกลับ
                    </div>
                </Link>
            </div>
        </>
    )
}
