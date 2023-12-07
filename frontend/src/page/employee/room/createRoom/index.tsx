import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
// import './index.css';
import { LoadingOutlined, PlusOutlined,UploadOutlined } from '@ant-design/icons';
import { message, Upload, Form, Button } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { RoomInterface } from '../../../../interface/IRoom';
import {RoomTypeInterface} from "./../../../../interface/IRoomType" ;
import { RoomZoneInterface } from '../../../../interface/IRoomZone';
import { EmployeeInterface } from '../../../../interface/IEmployee';
import { CreateRoom } from '../../../../services/https/room';
import {GetAllRoomType} from './../../../../services/https/roomType' ;
import { GetAllRoomZone } from '../../../../services/https/roomZone';
import { GetAllEmployee } from '../../../../services/https/employee';
import "./../room.css"
import "./createRoom.css"
import cruise from "../../../../asset/cruise.png"



// const getBase64 = (img: RcFile, callback: (url: string) => void) => {
//   const reader = new FileReader();
//   reader.addEventListener('load', () => callback(reader.result as string));
//   reader.readAsDataURL(img);
// };

// const beforeUpload = (file: RcFile) => {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJpgOrPng && isLt2M;
// };




export default function CreateRooms() {

  const [roomType, setRoomType] = useState<RoomTypeInterface[]>([]);
  const getRoomType = async () => {
    let res = await GetAllRoomType();
    if (res) {
      setRoomType(res);
    }
  };
  useEffect(() => {
    getRoomType();
  }, []);


  const [roomZone, setRoomZone] = useState<RoomZoneInterface[]>([]);
  const getRoomZone = async () => {
    let res = await GetAllRoomZone();
    if (res) {
      setRoomZone(res);
    }
  };
  useEffect(() => {
    getRoomZone();
  }, []);

  const [employee, setEmployee] = useState<EmployeeInterface[]>([]);
  const getEmployee = async () => {
    let res = await GetAllEmployee();
    if (res) {
      setEmployee(res);
    }
  };
  useEffect(() => {
    getEmployee();
  }, []);


  // const [loading, setLoading] = useState(false);
  // const [imageUrl, setImageUrl] = useState<string>();

  // const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
  //   if (info.file.status === 'uploading') {
  //     setLoading(true);
  //     return;
  //   }
  //   if (info.file.status === 'done') {
  //     // Get this url from response in real world.
  //     getBase64(info.file.originFileObj as RcFile, (url) => {
  //       setLoading(false);
  //       setImageUrl(url);
  //     });
  //   }
  // };

  // const uploadButton = (
  //   <div>
  //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div style={{ marginTop: 8 }}>Upload</div>
  //   </div>
  // );


  let navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const [roomNumber, setRoom_number] = useState("");

  const handleSubmit = async (values: RoomInterface) => {
    values.Room_number = roomNumber
    values.Room_img = room_img

    console.log(values.Room_number)

    let res = await CreateRoom(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/employee/room");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "บันทึกข้อมูลไม่สำเร็จ",
      });
    }
  };

  const [room_img, setRoom_Img] = useState("");

  const props: UploadProps = {
    beforeUpload: (file) => {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        if (e.target) {
          const base64Image = e.target.result as string; // Ensure it's a string
          // นำ base64Image ไปใช้ในการบันทึกรูปภาพลงใน entity
          setRoom_Img(base64Image); // ตั้งค่า state สำหรับเก็บรูปภาพ
        }
      };
  
      reader.readAsDataURL(file);
      return false; // Prevent automatic upload
    },
    onChange: (info) => {
      console.log(info.fileList);
    },
  };


  return (
    <div className='cruise-bg' style={{ backgroundImage: `url(${cruise})` }}>

      <h1 className='room-header'>Add a Room</h1>

      <div className='room-headline'></div>

      <div className='create-room-form'>

      <Form onFinish={handleSubmit}>
        <div className='create-room-form-control'>
          <label className='create-room-text'>Number of room</label>
          <br></br>
          <input className='create-room-input' type="text" placeholder = 'Enter number of room' required value={roomNumber} onChange={(e) => setRoom_number(e.target.value)} />
        </div>

        <div className='create-room-form-control'>
          <label className='create-room-text'>Room Type</label>
          <br></br>
          <div className='create-room-select'>
            <select className='create-room-select-custom'>
              <option value="" disabled selected>
                select room type
              </option>
              {roomType.map((item) => (
                <option value={item.ID} key={item.RoomType_name}>
                  {item.RoomType_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='create-room-form-control'>
          <label className='create-room-text'>Room Zone</label>
          <br></br>
          <div className='create-room-select'>
            <select className='create-room-select-custom' placeholder="Select a sevice">
              <option value="" disabled selected>
                select room zone
              </option>
              {roomZone.map((item) => (
                <option value={item.ID} key={item.RoomZone_name}>
                  {item.RoomZone_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='create-room-form-control'>
          <label className='create-room-text'>Price of Room</label>
          <br></br>
          <input className='create-room-input' type="number" step="0.01" placeholder = 'Enter price of room' required />
        </div>

        <div className='create-room-form-control'>
          <label className='create-room-text'>Image of Room</label>
          <br></br>
            <Upload {...props} accept='image/png, image/jpeg' action="/Repair">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          {/* <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload> */}
        </div>

        <div className='create-room-form-control'>
          <label className='create-room-text'>Employee</label>
          <br></br>
          <div className='create-room-select'>
            <select className='create-room-select-custom' placeholder="Select a employee">
              <option value="" disabled selected>
                select employee
              </option>
              {employee.map((item) => (
                <option value={item.ID} key={item.Employee_name}>
                  {item.Employee_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='buttom-area'>
          <button type='submit'>ยืนยัน</button>
        </div>
      
      </Form>

      </div>
    </div>
  )
}
