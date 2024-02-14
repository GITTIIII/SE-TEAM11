import { ChangeEvent, useEffect, useState } from "react";
import "./editRoom.css";
import { Button, Form, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { roomIDContext } from "..";
import { GetRoomById, UpdateRoom } from "../../../../services/https/room";
import { GetAllRoomType } from "../../../../services/https/roomType";
import { GetAllRoomZone } from "../../../../services/https/roomZone";
import { RoomInterface } from "../../../../interface/IRoom";
import { RoomTypeInterface } from "../../../../interface/IRoomType";
import { RoomZoneInterface } from "../../../../interface/IRoomZone";

function EditRoom({ onCancel }: { onCancel: () => void }) {
  const [room, setRoom] = useState<RoomInterface>();
  const [type, setType] = useState<RoomTypeInterface[]>([]);
  const [zone, setZone] = useState<RoomZoneInterface[]>([]);
  const [input, setInput] = useState({} as RoomInterface);
  const [room_img, setRoom_Img] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const roomID = useContext(roomIDContext);

  const getRoomType = async () => {
    let res = await GetAllRoomType();

    if (res) {
      setType(res);
    }
  };

  const getRoomZone = async () => {
    let res = await GetAllRoomZone();

    if (res) {
      setZone(res);
    }
  };

  const getRoomByID = async () => {
    let res = await GetRoomById(Number(roomID));
    setRoom(res);
    setInput(res);
  };

  useEffect(() => {
    getRoomType();
    getRoomZone();
    getRoomByID();
  }, []);

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
        setRoom_Img(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    let updatedValues: RoomInterface = {
      ID: Number(roomID),
      Room_number: input.Room_number,
      Room_img: room_img,
      RoomTypeID: Number(input.RoomTypeID),
      RoomZoneID: Number(input.RoomZoneID),
      Room_price: Number(input.Room_price),
      EmployeeID: Number(localStorage.getItem("EmployeeID")),
    };

    console.log(updatedValues);
    console.log(input);
    let res = await UpdateRoom(updatedValues);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "เเก้ไขข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        window.location.reload();
      }, 500);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
      console.log(res.message);
    }
  };

  return (
    <>
      <div className="update-room">
        {contextHolder}
        <div className="update-room-close-button">
          <Button type="text" icon={<CloseOutlined />} onClick={onCancel} />
        </div>

        <div className="update-room-header">
          <h1>แก้ไขข้อมูลห้อง : {room?.Room_number}</h1>
        </div>

        <div className="update-room-form">
          <Form onFinish={handleSubmit}>
            <label>หมายเลขห้องพัก</label>
            <input
              className="update-room-input"
              placeholder="Enter room number"
              name="Room_number"
              defaultValue={Object(room).Room_number}
              onChange={handleInput}
              required
            />
            <br/>

            <label>ประเภทห้องพัก</label>
            <select
              className="update-room-select-custom"
              name="RoomTypeID"
              onChange={handleInput}
            >
              <option
                value="none"
                hidden
                defaultValue={Number(Object(room).RoomTypeID)}
              >
                {Object(room).RoomType?.RoomType_name}
              </option>
              {type.map((item) => (
                <option value={item.ID} key={item.RoomType_name}>
                  {item.RoomType_name}
                </option>
              ))}
            </select>
            
            <label>โซนที่ตั้งห้องพัก</label>
            <select
              className="update-room-select-custom"
              name="RoomZoneID"
              onChange={handleInput}
            >
              <option
                value="none"
                hidden
                defaultValue={Number(Object(room).RoomZoneID)}
              >
                {Object(room).RoomZone?.RoomZone_name}
              </option>
              {zone.map((item) => (
                <option value={item.ID} key={item.RoomZone_name}>
                  {item.RoomZone_name}
                </option>
              ))}
            </select>
            
            <label>ราคาห้องพัก</label>
            <br></br>
            <input 
              className='update-room-input' 
              type="number" step="0.001" 
              placeholder = 'ระบุราคาห้องพัก'
              name="Room_price"
              defaultValue={Object(room).Room_price}
              onChange={handleInput}
              required
            />
            
            <label>รูปภาพห้องพัก</label>
            <br></br>
            <input
              className="update-room-form-info"
              id="Room_img"
              type="file"
              accept="image/*"
              name="Room_img"
              onChange={handleImageChange}
            />
            <br />

            <div className="update-room-button-area">
              <button type="submit">ยืนยัน</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default EditRoom;
