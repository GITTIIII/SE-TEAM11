import { Form, message } from 'antd';
import { useEffect, useState } from 'react'
import { ActivityInterface } from '../../../interface/IActivity';
import { CreateActivity, DeleteActivityByID } from '../../../services/https/activity';
import { GetAllActivity } from '../../../services/https/activity';
import  ship  from "../../../asset/ship.jpg"
import "./activity.css"

export default function Activity() {
    const [activity, setActivity] = useState<ActivityInterface[]>([]);
    const [messageApi, contextHolder] = message.useMessage();
    const [input, setInput] = useState({
        Activity_name : ""
    });

    const handleInput = (e: any) => {
        setInput({
        ...input,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (values: ActivityInterface) => {
        values.Activity_name = input.Activity_name
        console.log(values)

        let res = await CreateActivity(values);
        if (res.status) {
            messageApi.open({
                type: "success",
                content: "บันทึกข้อมูลสำเร็จ",
            });
            setTimeout(function () {
                window.location.reload();
            }, 500);
        } else {
            messageApi.open({
                type: "error",
                content: res.message,
            });
        }
    };

    const handleDelete  = async (values : ActivityInterface) => {
      let res = await await DeleteActivityByID(values.ID);
        if (res) {
          messageApi.open({
            type: "success",
            content: "ลบข้อมูลสำเร็จ",
          });
          setTimeout(function () {
            window.location.reload();
          }, 500);
        } else {
          messageApi.open({
            type: "error",
            content: "ลบข้อมูลไม่สำเร็จ",
          });
        }
    }

    useEffect(() => {
      const fetchData = async () => {
        setActivity(await GetAllActivity());
      };
      fetchData();
    }, []);

    return (
      <>
          <div className="activity-bg" style={{ backgroundImage: `url(${ship})` }}>
            <div className="activity-middle-box">
              {contextHolder}
              <h1>Activity</h1>
              <div className="activity-create-box">
                  <Form onFinish={handleSubmit}>
                    <input 
                    type="text" 
                    name='Activity_name'
                    onChange={handleInput}
                    />
                    <button type="submit" className='submit-button'>เพิ่ม</button>
                  </Form>
              </div>
              <div className="activity-list-box">
                {activity.map((data) => {
                  return (
                        <div key={data.ID} className="activity-item">
                          <div>{data.Activity_name}</div>
                          <button onClick={() => handleDelete(data)} className='submit-button'>ลบ</button>
                        </div>
                  );
                })}
              </div>
            </div>
          </div>
      </>
    )
}
