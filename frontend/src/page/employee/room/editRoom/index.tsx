import React, { useState, useEffect, useId } from "react";
import {
  Space,
  Button,
  Col,
  Row,
  Divider,
  Form,
  Input,
  Card,
  message,
  Upload,
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

const { Option } = Select;

function EditRoom() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

//   const [user, setUser] = useState<UsersInterface>();
  const [room, setRoom] = useState<RoomInterface>();
//   const [genders, setGenders] = useState<GendersInterface[]>([]);
  const [roomPrice, setRoom_price] = useState("");
  const [roomTypes, setRoomTypes] = useState<RoomTypeInterface[]>([]);
  const [roomZones, setRoomZones] = useState<RoomZoneInterface[]>([]);
  const [roomImage, setRoomImage] = useState<string | null>(null);

  // รับข้อมูลจาก params
  let { id } = useParams();
  // อ้างอิง form กรอกข้อมูล
  const [form] = Form.useForm();

  const onFinish = async (values: RoomInterface) => {
    values.ID = room?.ID;
    let res = await UpdateRoom(values);
    // values.Room_price = Number(roomPrice);
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

//   const getGendet = async () => {
//     let res = await GetGenders();
//     if (res) {
//       setGenders(res);
//     }
//   };

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

//   const getUserById = async () => {
//     let res = await GetUserById(Number(id));
//     if (res) {
//       setUser(res);
//       // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
//       form.setFieldsValue({
//         FirstName: res.FirstName,
//         LastName: res.LastName,
//         StudentID: res.StudentID,
//         GenderID: res.GenderID,
//         Email: res.Email,
//         Phone: res.Phone,
//         LinkedIn: res.LinkedIn
//       });
//     }
//   };
  const getRoomById = async () => {
    let res = await GetRoomById(Number(id));
    if (res) {
      setRoom(res);
      // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
      form.setFieldsValue({
        Room_number:    res.Room_number,
        Room_img:       res.Room_img,
        // Status?:       string;
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
    <div>
      {contextHolder}
      <Card>
        <h2> แก้ไขข้อมูล ห้องพัก</h2>
        <Divider />
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
                label="โซนที่ตั้ง"
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
            </Col>
          </Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <Form.Item
                // label="รูปห้อง"
                name="Room_img"
                getValueFromEvent={(e) => e.file.originFileObj}
                >
                {/* <Upload
                    name="Room_img"
                    listType="picture"
                    showUploadList={false}
                    beforeUpload={(file) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        setRoomImage(reader.result as string);
                    };
                    reader.readAsDataURL(file);
                    return false; // Prevent default upload behavior
                    }}
                >
                    <Button icon={<UploadOutlined />}>อัปโหลดรูป</Button>
                </Upload> */}
                {roomImage && <img src={roomImage} alt="Room" style={{ maxWidth: "100%", marginTop: "10px" }} />}
            </Form.Item>
          </Col>
          <Row justify="end">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
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
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

export default EditRoom;
