import React, { useState, useEffect, useId } from "react";
import {
  Button,
  Form,
  Input,
  message,
  Select,
  InputNumber,
} from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { RoomInterface } from "../../../../interface/IRoom";
import { RoomTypeInterface } from "../../../../interface/IRoomType";
import { RoomZoneInterface } from "../../../../interface/IRoomZone";
import { CreateRoom, GetRoomById, UpdateRoom } from "../../../../services/https/room";
import { GetAllRoomType } from "../../../../services/https/roomType";
import { GetAllRoomZone } from "../../../../services/https/roomZone";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./../room.css"
import "./editRoom.css"
import cruise from "../../../../asset/cruise.png"

const { Option } = Select;

function EditRoom() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [room, setRoom] = useState<RoomInterface>();
  const [roomPrice, setRoom_price] = useState("");
  const [roomTypes, setRoomTypes] = useState<RoomTypeInterface[]>([]);
  const [roomZones, setRoomZones] = useState<RoomZoneInterface[]>([]);
  const [roomImage, setRoomImage] = useState<string | null>(null);
  const EmployeeID = localStorage.getItem("EmployeeID");
  // รับข้อมูลจาก params
  let { id } = useParams();
  // อ้างอิง form กรอกข้อมูล
  const [form] = Form.useForm();

  const onFinish = async (values: RoomInterface) => {
    values.ID = room?.ID;
    console.log(values)
    let res = await UpdateRoom(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "แก้ไขข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/employee/room");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
    }
  };
    const getRoomType = async () => {
        let res = await GetAllRoomType();
        if (res) {
        setRoomTypes(res);
        }
    };
    const getRoomZone = async () => {
        let res = await GetAllRoomZone();
        if (res) {
        setRoomZones(res);
        }
    };

  const getRoomById = async () => {
    let res = await GetRoomById(Number(id));
    if (res) {
      setRoom(res);
      // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
      form.setFieldsValue({
        Room_number:    res.Room_number,
        Room_img:       res.Room_img,
        Room_price:     res.Room_price,
        RoomTypeID:     res.RoomTypeID,    
        RoomZoneID:     res.RoomZoneID,
        EmployeeID:     res.EmployeeID,
      });
    }
  };

  useEffect(() => {
    getRoomType();
    getRoomZone();
    getRoomById();
  }, []);

  return (
    <div className='cruise-bg' style={{ backgroundImage: `url(${cruise})` }}>
      {contextHolder}
      <h1 className='room-header'>Edit Room</h1>
      <div className='room-headline'></div>
      <div className='edit-room-form'>
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              {/* <Form.Item
                label="ชื่อจริง"
                name="FirstName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อ !",
                  },
                ]}
              >
                <Input />
              </Form.Item> */}
              <Form.Item
                label="เลขห้อง"
                name="Room_number"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกเลขห้อง !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ราคา"
                name="Room_price"
                // type="number" step="0.001"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกราคา !",
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              {/* <div className='create-room-form-control'>
          <label className='create-room-text'>Price of Room</label>
          <br></br>
          <input 
            className='create-room-input' 
            type="number" step="0.001" 
            placeholder = 'Enter price of room' 
            name="Room_price"
            // required value={roomPrice} onChange={(e) => setRoom_price(e.target.value)}
          />
        </div> */}
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="RoomTypeID"
                label="ประเภท"
                rules={[{ required: true, message: "กรุณาระบุประเภท !" }]}
              >
                <Select allowClear>
                  {roomTypes.map((item) => (
                    <Option value={item.ID} key={item.RoomType_name}>
                      {item.RoomType_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <Form.Item
              name="RoomZoneID"
              rules={[{ required: true, message: "กรุณาระบุโซนที่ตั้ง !" }]}
            >
              <Select allowClear>
                {roomZones.map((item) => (
                  <Option value={item.ID} key={item.RoomZone_name}>
                    {item.RoomZone_name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className='edit-room-form-control'>
            <label className='edit-room-text'>Price of Room</label>
            <Form.Item
              name="Room_price"
              rules={[
                {
                  required: true,
                  message: "กรุณากรอกราคา !",
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
          </div>
            <Form.Item
              name="Room_img"
              getValueFromEvent={(e) => e.file.originFileObj}
            >
              {roomImage && <img src={roomImage} alt="Room" style={{ maxWidth: "100%", marginTop: "10px" }} />}
            </Form.Item>
              <Form.Item>
                  <NavLink to="/employee/room">
                    <Button htmlType="button" style={{ marginRight: "10px" }}>
                      cancle
                    </Button>
                  </NavLink>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlusOutlined />}
                  >
                    confirm
                  </Button>
              </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default EditRoom;