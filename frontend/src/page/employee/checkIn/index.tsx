import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Form, Card } from 'antd';
import cruise from '../../../asset/cruise.png';
import './checkIn.css';
import { CheckInInterface } from '../../../interface/ICheckIn';
import { CreateCheckIn } from '../../../services/https/checkIn';
import { GetBookPlanById } from '../../../services/https/bookPlan';
import { BookPlanInterface } from '../../../interface/IBookPlan';

const gridStyle: React.CSSProperties = {
  width: '50%',
  textAlign: 'left',
};

export default function CheckIn() {
  let navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const [bookPlanID, setbookPlanID] = useState('');
  const [bookPlan, setBookPlan] = useState<BookPlanInterface | null>(null);

  const getData = async () => {
    
    let res = await GetBookPlanById(Number(bookPlanID));
    if (res) {
      setBookPlan(res);
      console.log(res);
    }
  };

  const handleSubmit = async (values: CheckInInterface) => {
    values.BookPlanID = Number(bookPlanID);

    console.log(values);

    let res = await CreateCheckIn(values);
    if (res.status) {
      messageApi.open({
        type: 'success',
        content: 'บันทึกข้อมูลสำเร็จ',
      });
      setTimeout(function () {
        // navigate('/employee/check-in');
        window.location.reload()
      }, 2000);
    } else {
      messageApi.open({
        type: 'error',
        content: 'บันทึกข้อมูลไม่สำเร็จ',
      });
    }
  };

  return (
    <div className="checkIn-cruise-bg" style={{ backgroundImage: `url(${cruise})` }}>
      {contextHolder}
        <h1 className="checkIn-header">Check-In</h1>
        <div className="checkIn-headline" />
      <div className='checkIn-display'>
        <div className="checkIn-form">
          <div className="checkIn-text">Book Plan ID</div>
          <div className="checkIn-form-control">
            <input
              className="checkIn-input"
              type="text"
              placeholder="Enter book plan ID"
              value={bookPlanID}
              onChange={(e) => setbookPlanID(e.target.value)}
              required
            />
            <div className="checkIn-search-buttom-area">
              <button type="button" onClick={getData}>
                Search
              </button>
            </div>
          </div>
        </div>

        {bookPlan && (
          <Card className='checkIn-card' title={bookPlan?.Tourist?.Tourist_name}>
            <Card.Grid hoverable={false} style={gridStyle}>
              <img
                src={bookPlan?.Room?.Room_img}
                alt={`Room Image - ${bookPlan?.Room?.Room_number}`}
                style={{ maxWidth: '100%', maxHeight: "100%" }}
              />
            </Card.Grid>
            <Card.Grid hoverable={false} style={gridStyle}>
              <p>
                <b>Phone Number:</b>
                {bookPlan?.Tourist?.Phone}
              </p>
              <p>
                <b>Plan Name:</b>
                {bookPlan?.Planner?.Plan_name}
              </p>
              <p>
                <b>Port Destinaton:</b>
                {bookPlan?.Planner?.Destination?.PortDestinaton?.PortDestination_name}
              </p>
              <p>
                <b>Port Origin:</b>
                {bookPlan?.Planner?.Destination?.PortOrigin?.PortOrigin_name}
              </p>
              <p>
                <b>Room Number:</b>
                {bookPlan?.Room?.Room_number}
              </p>
              <p>
                <b>Food Set Name:</b>
                {bookPlan?.FoodSet?.Name}
              </p>
            </Card.Grid>
          </Card>
        )}
        {bookPlan && (
          <Form onFinish={handleSubmit}>
            <div className="checkIn-buttom-area">
              <button type="submit">Check In</button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}
