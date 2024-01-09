import { Form, Link } from "react-router-dom"
import { DatePicker } from "antd"
import type { Dayjs } from 'dayjs';
import "../bookActivity.css"
import { useState } from "react";

export default function BookActivityCreate() {
    const { RangePicker } = DatePicker;
    type RangeValue = [Dayjs | null, Dayjs | null] | null;
    const [dates, setDates] = useState<RangeValue>(null);
    const [value, setValue] = useState<RangeValue>(null);

    const onOpenChange = (open: boolean) => {
        if (open) {
            setDates([null, null]);
        } else {
            setDates(null);
        }
    };

    const disabledDate = (current: Dayjs) => {
        if (!dates) {
            return false;
        }
        const tooLate = dates[0] && current.diff(dates[0], 'days') >= 1;
        const tooEarly = dates[1] && dates[1].diff(current, 'days') >= 1;
        return !!tooEarly || !!tooLate;
    };

    return (
        <>
            <div className="login-bg" style={{ backgroundColor: `wheat` }}>
                <div className="form-box">
                    <h1>จองกิจกรรม</h1>
                    <div className="activity-input-box">
                        <Form>
                            <label>เลือกวัน</label>
                            <RangePicker
                            value={dates || value}
                            disabledDate={disabledDate}
                            onCalendarChange={(val) => {
                                setDates(val);
                            }}
                            onChange={(val) => {
                                setValue(val);
                            }}
                            onOpenChange={onOpenChange}
                            changeOnBlur
                            />

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
