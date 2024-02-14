import { Form, Popconfirm, message } from 'antd';
import { ChangeEvent, useEffect, useState } from 'react'
import { ActivityInterface } from '../../../interface/IActivity';
import { CreateActivity, DeleteActivityByID } from '../../../services/https/activity';
import { GetAllActivity } from '../../../services/https/activity';
import  planetBG  from "../../../asset/planetBG.png"
import "./activity.css"

export default function Activity() {
    const [activity, setActivity] = useState<ActivityInterface[]>([]);
    const [Activity_img, setActivity_img] = useState("");
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

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string; // Type assertion to string
          // เปลี่ยน setImage เพื่อทำการใช้ base64String
          setActivity_img(base64String);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = async (values: ActivityInterface) => {
        values.Activity_name = input.Activity_name;
        values.Activity_img = Activity_img;
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

    const cancel = () => {
      message.error('Click on No');
    };
    
    useEffect(() => {
      const fetchData = async () => {
        setActivity(await GetAllActivity());
      };
      fetchData();
    }, []);

    return (
      <>
          <div className="activity-bg" style={{ backgroundImage: `url(${planetBG})` }}>
            <div className="activity-middle-box">
              {contextHolder}
              <h1>กิจกรรม</h1>
              <div className="activity-create-box">
                  <Form onFinish={handleSubmit}>
                    <label>ชื่อกิจกรรม</label>
                    <input 
                    type="text" 
                    name='Activity_name'
                    onChange={handleInput}
                    />
                    <label>รูปกิจกรรม</label>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    />

                    <button type="submit" className='submit-button'>เพิ่ม</button>
                  </Form>
              </div>
            
              <div className="activity-list-box">
                {activity.map((data) => {
                  const isBase64 = data.Activity_img?.startsWith('data:image/');
                  const imageSource = isBase64
                    ? data.Activity_img
                    : require(`../../../asset/${data.Activity_img}`);
                  return (
                        <div key={data.ID} className="activity-item">
                          <img src={imageSource} alt="activity_image" />
                          <div>{data.Activity_name}</div>
                          <Popconfirm
                          title="ลบกิจกรรม"
                          description="คุณต้องการที่จะลบรายการนี้ใช่มั้ย"
                          onConfirm={() => handleDelete(data)}
                          onCancel={() => cancel}
                          okText="Yes"
                          cancelText="No"
                          >
                            <button className='submit-button'>
                              ลบ
                            </button>
                          </Popconfirm>
                        </div>
                  );
                })}
              </div>
            </div>
          </div>
      </>
    )
}
