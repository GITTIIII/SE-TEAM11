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


export default function CreateRooms() {

  const [roomType, setRoomType] = useState<RoomTypeInterface[]>([]);
  const [selectedRoomType, setSelectedRoomType] = useState<string | undefined>(undefined);
  
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
  const [selectedRoomZone, setSelectedRoomZone] = useState<string | undefined>(undefined);
  const getRoomZone = async () => {
    let res = await GetAllRoomZone();
    if (res) {
      setRoomZone(res);
    }
  };
  useEffect(() => {
    getRoomZone();
  }, []);


  let navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const [roomNumber, setRoom_number] = useState("");

  const handleSubmit = async (values: RoomInterface) => {
    values.Room_number = roomNumber
    values.RoomTypeID = selectedRoomType ? parseInt(selectedRoomType, 10) : undefined;
    values.RoomZoneID = selectedRoomZone ? parseInt(selectedRoomZone, 10) : undefined;
    values.Room_img = room_img

    console.log(values)

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
            <select 
              className='create-room-select-custom'
              value={selectedRoomType}
              onChange={(e) => setSelectedRoomType(e.target.value)}
            >
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
            <select 
              className='create-room-select-custom'
              value={selectedRoomZone}
              onChange={(e) => setSelectedRoomZone(e.target.value)}
            >
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
        </div>


        <div className='buttom-area'>
          <button type='submit'>ยืนยัน</button>
        </div>
      
      </Form>

      </div>
    </div>
  )
}
