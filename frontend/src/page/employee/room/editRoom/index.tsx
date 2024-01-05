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
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { RoomInterface } from "../../../../interface/IRoom";
import { RoomTypeInterface } from "../../../../interface/IRoomType";
import { RoomZoneInterface } from "../../../../interface/IRoomZone";
import { CreateRoom, GetRoomById, UpdateRoom } from "../../../../services/https/room";
import { GetAllRoomType } from "../../../../services/https/roomType";
import { GetAllRoomZone } from "../../../../services/https/roomZone";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

function EditRoom() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

//   const [user, setUser] = useState<UsersInterface>();
  const [room, setRoom] = useState<RoomInterface>();
//   const [genders, setGenders] = useState<GendersInterface[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomTypeInterface[]>([]);
  const [roomZones, setRoomZones] = useState<RoomZoneInterface[]>([]);

  // รับข้อมูลจาก params
  let { id } = useParams();
  // อ้างอิง form กรอกข้อมูล
  const [form] = Form.useForm();

  const onFinish = async (values: RoomInterface) => {
    values.ID = room?.ID;
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
        // Room_img?:     string;
        // Status?:       string;
        Room_price:     res.Room_price,
        RoomTypeID:     res.RoomTypeID,    
        RoomZoneID:     res.RoomZoneID,
        EmployeeID:     res.EmployeeID,
        // GenderID: res.GenderID,
        // Email: res.Email,
        // Phone: res.Phone,
        // LinkedIn: res.LinkedIn
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
              {/* <Form.Item
                label="นามกสุล"
                name="LastName"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกนามสกุล !",
                  },
                ]}
              >
                <Input />
              </Form.Item> */}
              <Form.Item
                label="ราคา"
                name="Room_price"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกราคา !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            {/* <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="รหัสนักศึกษา"
                name="StudentID"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกรหัสนักศึกษา !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col> */}
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              {/* <Form.Item
                name="GenderID"
                label="เพศ"
                rules={[{ required: true, message: "กรุณาระบุเพศ !" }]}
              >
                <Select allowClear>
                  {genders.map((item) => (
                    <Option value={item.ID} key={item.Name}>
                      {item.Name}
                    </Option>
                  ))}
                </Select>
              </Form.Item> */}
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
            {/* <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="เบอร์โทรศัพท์"
                name="Phone"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกเบอร์โทรศัพท์ !",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col> */}
          </Row>
          {/* <Col xs={24} sm={24} md={24} lg={24} xl={12}>
            <Form.Item
              label="LinkedIn"
              name="LinkedIn"
              rules={[
                {
                  // required: true,
                  message: "กรุณากรอก LinkedIn Profile URL !",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col> */}
          <Row justify="end">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                  <Button htmlType="button" style={{ marginRight: "10px" }}>
                    ยกเลิก
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlusOutlined />}
                  >
                    ยืนยัน
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
