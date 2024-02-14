import { useState, useEffect, ChangeEvent } from 'react'
import { useNavigate } from "react-router-dom";
import { message, Form } from 'antd';
import { RoomInterface } from '../../../../interface/IRoom';
import { RoomTypeInterface } from "./../../../../interface/IRoomType" ;
import { RoomZoneInterface } from '../../../../interface/IRoomZone';
import { CreateRoom } from '../../../../services/https/room';
import { GetAllRoomType } from './../../../../services/https/roomType' ;
import { GetAllRoomZone } from '../../../../services/https/roomZone';
import "./../room.css"
import "./createRoom.css"

export default function CreateRooms() {
  let navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [roomNumber, setRoom_number] = useState("");
  const [roomPrice, setRoom_price] = useState("");
  const [room_img, setRoom_Img] = useState("");
  const EmployeeID = localStorage.getItem("EmployeeID");
  const [roomType, setRoomType] = useState<RoomTypeInterface[]>([]);
  const [roomZone, setRoomZone] = useState<RoomZoneInterface[]>([]);

  const getRoomType = async () => {
    let res = await GetAllRoomType();
    if (res) {
      setRoomType(res);
    }
  };

  const getRoomZone = async () => {
    let res = await GetAllRoomZone();
    if (res) {
      setRoomZone(res);
    }
  };

  const [input, setInput] = useState({
    RoomTypeID :0,
    RoomZoneID :0,
  });
  
  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: parseInt(value,10),
    });
  };

  const handleSubmit = async (values: RoomInterface) => {
    values.Room_number = roomNumber
    values.RoomTypeID = input.RoomTypeID
    values.RoomZoneID = input.RoomZoneID
    values.Room_price = Number(roomPrice)
    values.Room_img = room_img
    values.EmployeeID = Number(EmployeeID);

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
        content: res.message,
        duration: 20,
      });
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string; // Type assertion to string
        // เปลี่ยน setImage เพื่อทำการใช้ base64String
        setRoom_Img(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    getRoomType();
    getRoomZone();
  }, []);

  return (
    <div className='create-room-table-show'>
      {contextHolder}
      <h1 className='create-room-header'>เพิ่มห้องพัก</h1>
      <hr />
      <div className="create-room-container">
        <div className="create-room-imgBG">
          <img src="https://media.istockphoto.com/id/1206189312/th/%E0%B8%A3%E0%B8%B9%E0%B8%9B%E0%B8%96%E0%B9%88%E0%B8%B2%E0%B8%A2/%E0%B8%84%E0%B8%A5%E0%B8%B2%E0%B8%AA%E0%B8%AA%E0%B8%B4%E0%B8%81%E0%B8%AA%E0%B8%B5%E0%B8%9F%E0%B9%89%E0%B8%B2%E0%B8%9E%E0%B8%A3%E0%B8%B0%E0%B8%A3%E0%B8%B2%E0%B8%8A%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%99%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2%E0%B9%80%E0%B8%81%E0%B9%89%E0%B8%B2%E0%B8%AD%E0%B8%B5%E0%B9%89-%E0%B9%80%E0%B8%95%E0%B8%B2%E0%B8%9C%E0%B8%B4%E0%B8%87-%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B8%A2%E0%B8%99-%E0%B9%82%E0%B8%84%E0%B8%A1%E0%B9%84%E0%B8%9F%E0%B8%8A%E0%B8%B1%E0%B9%89%E0%B8%99-%E0%B8%9E%E0%B8%A3%E0%B8%A1%E0%B8%82%E0%B8%AD%E0%B8%87-%E0%B8%A0%E0%B8%B2%E0%B8%9E%E0%B8%88%E0%B9%8D%E0%B8%B2%E0%B8%A5%E0%B8%AD%E0%B8%87%E0%B8%A0%E0%B8%B2%E0%B8%9E-3-%E0%B8%A1%E0%B8%B4%E0%B8%95%E0%B8%B4.jpg?s=2048x2048&w=is&k=20&c=t8Y2vbntDpoQz9rJd0Q6lR4e0N6dFVTIqWJ1CWUs160=" alt="" />
        </div>
      <div className='create-room-form'>
        <Form onFinish={handleSubmit}>
          <div className='create-room-form-control'>
            <label className='create-room-text' style={{color: '#535b66'}}>หมายเลขห้องพัก</label>
            <br></br>
            <input 
              className='create-room-input' 
              type="text" placeholder = 'ระบุหมายเลขห้องพัก'
              value={roomNumber} onChange={(e) => setRoom_number(e.target.value)}
              required
            />
          </div>
          <div className='create-room-form-control'>
            <label className='create-room-text' style={{color: '#535b66'}}>ประเภทห้องพัก</label>
            <br></br>
            <div className='create-room-select'>
              <select
                className='create-room-select-custom'
                name="RoomTypeID"
                onChange={handleInput}
                required
              >
                <option value="" disabled selected>
                  เลือกประเภทห้องพัก
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
            <label className='create-room-text' style={{color: '#535b66'}}>โซนที่ตั้งห้องพัก</label>
            <br></br>
            <div className='create-room-select'>
              <select 
                className='create-room-select-custom'
                name="RoomZoneID"
                onChange={handleInput}
                required
              >
                <option value="" disabled selected>
                  เลือกโซนที่ตั้งห้องพัก
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
            <label className='create-room-text' style={{color: '#535b66'}}>ราคาห้องพัก</label>
            <br></br>
            <input 
              className='create-room-input' 
              type="number" step="0.001" 
              placeholder = 'ระบุราคาห้องพัก'
              value={roomPrice} onChange={(e) => setRoom_price(e.target.value)}
              required
            />
          </div>
          <div className='create-room-form-control'>
            <label className='create-room-text' style={{color: '#535b66'}}>อัปโหลดรูปห้องพัก</label>
            <br></br>
            <input
              className="CreateRoom-input-file"
              id="room_img"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className='buttom-area'>
            <button type='submit'>ยืนยัน</button>
          </div>    
        </Form>
      </div>
      </div>
     
        
      </div>
  )
}