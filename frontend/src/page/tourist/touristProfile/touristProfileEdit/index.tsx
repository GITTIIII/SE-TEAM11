import { useEffect, useState } from 'react'
import { GetTouristById, UpdateTourist } from '../../../../services/https/tourist';
import { TouristInterface } from '../../../../interface/ITourist';
import { Button, Form, message, Upload, UploadProps, Select } from "antd"
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import ship from "../../../../asset/ship.jpg"
import userProfile from "../../../../asset/no_profile.png"
import "../touristProfile.css"

export default function EditProfile() {
  const [tourist, setTourist] = useState<TouristInterface>();
  const [input, setInput] = useState({} as TouristInterface);
  const [messageApi, contextHolder] = message.useMessage();
  const [ picture, setPicture] = useState("");
  const navigate = useNavigate();
  const TouristID = localStorage.getItem("TouristID")

  const props: UploadProps = {
    beforeUpload: (file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          const base64Image = e.target.result as string; // Ensure it's a string
          // นำ base64Image ไปใช้ในการบันทึกรูปภาพลงใน entity
          setPicture(base64Image); // ตั้งค่า state สำหรับเก็บรูปภาพ
        }
      };

      reader.readAsDataURL(file);
      return false; // Prevent automatic upload
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };

  const handleInput = (e: any) => {
    setInput({
        ...input, [e.target.name]: e.target.value});
  };

  const handleSubmit = async () => {
    let updatedValues: TouristInterface =  {
        ID: Number(tourist?.ID),
        Tourist_name: input.Tourist_name,
        Email: input.Email,
        Gender: input.Gender,
        Phone: input.Phone,
        Picture: picture,
        Age: Number(input.Age)
    }
    
    console.log(updatedValues);
    let res = await UpdateTourist(updatedValues);
    if (res.status) {
        messageApi.open({
            type: "success",
            content: "เเก้ไขข้อมูลสำเร็จ",
        });
        setTimeout(function () {
            window.location.reload();
        }, 20);
        navigate("/tourist/touristProfile");
    } else {
        messageApi.open({
            type: "error",
            content: res.message,
        });
        console.log(res.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await GetTouristById(Number(TouristID));
      setTourist(data);
      setInput(data);
    };
    fetchData();
  }, []);

  return (
    <>
    <div className="profile-bg"  style={{ backgroundImage: `url(${ship})`}}>
      {contextHolder}
      <div className="profile-box">
        <h1>เเก้ไขโปรไฟล์</h1>
        <Form onFinish={handleSubmit}>
          <div className="profile-picture">
            <img src={Object(tourist).Picture === "" ? userProfile : Object(tourist).Picture} alt="userProfile" className="profile"/>
            <Upload {...props} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>
          <div className="update-infomation">
            <div className="profile-input">
                <label>ชื่อ</label>
                <input 
                type="text"
                name="Tourist_name"
                defaultValue={Object(tourist).Tourist_name}
                onChange={handleInput}
                />
            </div>

            <div className="profile-input">
                <label>อีเมล</label>
                <input 
                type="text" 
                name="Email"
                defaultValue={Object(tourist).Email}
                onChange={handleInput}
                />
            </div>

            <div className="profile-input">
                <label>เพศ</label>
                <select name="Gender" onChange={handleInput}>
                    <option value="none" hidden>{Object(tourist).Gender}</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </div>

            <div className="profile-input">
                <label>เบอร์โทร</label>
                <input 
                type="text" 
                name="Phone_number"
                defaultValue={Object(tourist).Phone}
                onChange={handleInput}
                />
            </div>

            <div className="profile-input">
                <label>อายุ</label>
                <input 
                type="number" 
                name="Age"
                defaultValue={Object(tourist).Age}
                onChange={handleInput}
                />
            </div>
            <div className="update-button">
              <button type='submit' className='activity-button'>
                บันทึก
              </button>
              <button className='cancel-button' onClick={() => navigate("/tourist/touristProfile")}>
                ยกเลิก
              </button>
            </div>
          </div>
        </Form>
      </div>
    </div>
    </>
  )
}
