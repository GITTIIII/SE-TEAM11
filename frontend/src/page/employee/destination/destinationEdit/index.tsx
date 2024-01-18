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
import { DestinationInterface } from "../../../../interface/IDestination";
import { PortOriginInterface } from "../../../../interface/IPortOrigin";
import { PortDestinationInterface } from "../../../../interface/IPortDestination";
import { DistanceInterface } from "../../../../interface/IDistance";
import {
  GetDestinationById,
  UpdateDestination,
} from "../../../../services/https/destination";
import { GetAllPortOrigin } from "../../../../services/https/portOrigin";
import { GetAllPortDestination } from "../../../../services/https/portDestination";
import { GetAllDistance } from "../../../../services/https/distance";
import { useNavigate, useParams } from "react-router-dom";

const { Option } = Select;

function DestinationEdit() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  //   const [user, setUser] = useState<UsersInterface>();
  const [destination, setDestination] = useState<DestinationInterface>();
  const [destinationPrice, setDestination_price] = useState("");
  const [destinationImage, setDestinationImage] = useState<string | null>(null);
  const [destinationNames, setDestinationNames] = useState("");
  // const [destination, setDestination] = useState<DestinationInterface>();
  //   const [genders, setGenders] = useState<GendersInterface[]>([]);
  const [portOrigins, setPortOrigins] = useState<PortOriginInterface[]>([]);
  const [portDestinations, setPortDestinations] = useState<
    PortDestinationInterface[]
  >([]);
  const [distances, setDistance] = useState<DistanceInterface[]>([]);

  // รับข้อมูลจาก params
  let { id } = useParams();
  // อ้างอิง form กรอกข้อมูล
  const [form] = Form.useForm();

  const onFinish = async (values: DestinationInterface) => {
    values.ID = destination?.ID;
    let res = await UpdateDestination(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "แก้ไขข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/employee/destination");
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

  const getPortOrigin = async () => {
    let res = await GetAllPortOrigin();
    if (res) {
      setPortOrigins(res);
    }
  };
  const getPortDestination = async () => {
    let res = await GetAllPortDestination();
    if (res) {
      setPortDestinations(res);
    }
  };
  const getDistance = async () => {
    let res = await GetAllDistance();
    if (res) {
      setDistance(res);
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
  const getDestinationById = async () => {
    let res = await GetDestinationById(Number(id));
    if (res) {
      setDestination(res);
      // set form ข้อมูลเริ่มของผู่้ใช้ที่เราแก้ไข
      form.setFieldsValue({
        PortOriginID: res.PortOriginID,
        PortDestinationID: res.PortDestinationID,
        DistanceID: res.DistanceID,
        Destination_img: res.Destination_img,
        Destination_price: res.Destination_price,
        Destination_name: res.Destination_name,
        // GenderID: res.GenderID,
        // Email: res.Email,
        // Phone: res.Phone,
        // LinkedIn: res.LinkedIn
      });
    }
  };

  useEffect(() => {
    getPortOrigin();
    getPortDestination();
    getDistance();
    getDestinationById();
  }, []);

  return (
    <div>
      {contextHolder}
      <Card>
        <h2> แก้ไขข้อมูล จุดหมาย</h2>
        <Divider />
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            {/* {
              <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                <Form.Item
                  label="รูปทริป"
                  name="Destination_img"
                  getValueFromEvent={(e) => e.file.originFileObj}
                >
                  <Upload
                    name="Destination_img"
                    listType="picture"
                    showUploadList={false}
                    beforeUpload={(file) => {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setDestinationImage(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                      return false; // Prevent default upload behavior
                    }}
                  >
                    <Button icon={<UploadOutlined />}>อัปโหลดรูป</Button>
                  </Upload>
                  {destinationImage && (
                    <img
                      src={destinationImage}
                      alt="Destination"
                      style={{ maxWidth: "100%", marginTop: "10px" }}
                    />
                  )}
                </Form.Item>
              </Col>
            } */}
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ชื่อทริป"
                name="Destination_name"
                // type="number" step="0.001"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกชื่อทรืป !",
                  },
                ]}
              >
                <Input />
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
                name="PortOriginID"
                label="ต้นทาง"
                rules={[{ required: true, message: "กรุณาระบุต้นทาง !" }]}
              >
                <Select allowClear>
                  {portOrigins.map((item) => (
                    <Option value={item.ID} key={item.PortOrigin_name}>
                      {item.PortOrigin_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="PortDestinationID"
                label="ปลายทาง"
                rules={[{ required: true, message: "กรุณาระบุปลายทาง !" }]}
              >
                <Select allowClear>
                  {portDestinations.map((item) => (
                    <Option value={item.ID} key={item.PortDestination_name}>
                      {item.PortDestination_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                name="DistanceID"
                label="ระยะทาง"
                rules={[{ required: true, message: "กรุณาระบุระยะทาง !" }]}
              >
                <Select allowClear>
                  {distances.map((item) => (
                    <Option value={item.ID} key={item.Distance_name}>
                      {item.Distance_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
              <Form.Item
                label="ราคา"
                name="Destination_price"
                rules={[
                  {
                    required: true,
                    message: "กรุณากรอกราคา!",
                  },
                ]}
              >
                <InputNumber
                // type="number" // This prop might not be necessary, you can try removing it
                // step={0.001}
                // style={{ width: "100%" }} // Adjust the width as needed
                />
              </Form.Item>
            </Col>
            <Form.Item
              name="Destination_img"
              getValueFromEvent={(e) => e.file.originFileObj}
            >
              {destinationImage && (
                <img
                  src={destinationImage}
                  alt="Destination"
                  style={{ maxWidth: "100%", marginTop: "10px" }}
                />
              )}
            </Form.Item>

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
          <Row justify="end">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                  <Button
                    htmlType="button"
                    style={{ marginRight: "10px" }}
                    onClick={() => navigate("/employee/destination")}
                  >
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

export default DestinationEdit;
