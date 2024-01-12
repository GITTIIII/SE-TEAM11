import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message, Form, Button, Upload } from "antd";
import type { UploadProps } from "antd/es/upload/interface";
import { PortOriginInterface } from "../../../../interface/IPortOrigin";
import { PortDestinationInterface } from "../../../../interface/IPortDestination";
import { DistanceInterface } from "../../../../interface/IDistance";
import { DestinationInterface } from "../../../../interface/IDestination";
import "./../destinationCreate/destinationCreate.css";
import "./destinationCreate.css";
import cruise from "../../../../asset/cruise.png";
import { GetAllPortOrigin } from "../../../../services/https/portOrigin";
import { GetAllPortDestination } from "../../../../services/https/portDestination";
import { GetAllDistance } from "../../../../services/https/distance";
import { CreateDestination } from "../../../../services/https/destination";
import { UploadOutlined } from "@ant-design/icons";

export default function DestinationCreates() {
  const [portOrigin, setPortOrigin] = useState<PortOriginInterface[]>([]);
  const getPortOrigin = async () => {
    let res = await GetAllPortOrigin();
    if (res) {
      setPortOrigin(res);
    }
  };
  useEffect(() => {
    getPortOrigin();
  }, []);

  const [portDestination, setPortDestination] = useState<
    PortDestinationInterface[]
  >([]);
  const getPortDestination = async () => {
    let res = await GetAllPortDestination();
    if (res) {
      setPortDestination(res);
    }
  };
  useEffect(() => {
    getPortDestination();
  }, []);

  const [Distance, setDistance] = useState<DistanceInterface[]>([]);
  const getDistance = async () => {
    let res = await GetAllDistance();
    if (res) {
      setDistance(res);
    }
  };
  useEffect(() => {
    getDistance();
  }, []);

  const [input, setInput] = useState({
    portOriginID: 0,
    portDestinationID: 0,
    DistanceID: 0,
  });

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: parseInt(value, 10),
    });
  };

  let navigate = useNavigate();
  const [Destination_Img, setDestination_Img] = useState("");

  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (values: DestinationInterface) => {
    values.Destination_Img = Destination_Img;
    values.PortOriginID = input.portOriginID;
    values.PortDestinationID = input.portDestinationID;
    values.DistanceID = input.DistanceID;

    console.log(values);

    let res = await CreateDestination(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/employee/destination");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "บันทึกข้อมูลไม่สำเร็จ",
      });
    }
  };
  const props: UploadProps = {
    beforeUpload: (file) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          const base64Image = e.target.result as string; // Ensure it's a string
          // นำ base64Image ไปใช้ในการบันทึกรูปภาพลงใน entity
          setDestination_Img(base64Image); // ตั้งค่า state สำหรับเก็บรูปภาพ
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
    <div className="cruise-bg" style={{ backgroundImage: `url(${cruise})` }}>
      {contextHolder}

      <h1 className="destination-header">Add a Destination</h1>

      <div className="destination-headline"></div>
      <div className="create-destination-form">
        <Form onFinish={handleSubmit}>
          <div className="create-destination-form-control">
            <label className="create-destination-text">Port Origin</label>
            <br></br>
            <div className="create-destination-select">
              <select
                className="create-destination-select-custom"
                name="portOriginID"
                onChange={handleInput}
              >
                <option value="" disabled selected>
                  select port origin
                </option>
                {portOrigin.map((item) => (
                  <option value={item.ID} key={item.PortOrigin_name}>
                    {item.PortOrigin_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="create-destination-form-control">
            <label className="create-destination-text">Port Destination</label>
            <br></br>
            <div className="create-destination-select">
              <select
                className="create-destination-select-custom"
                name="portDestinationID"
                onChange={handleInput}
              >
                <option value="" disabled selected>
                  select port destination
                </option>
                {portDestination.map((item) => (
                  <option value={item.ID} key={item.PortDestination_name}>
                    {item.PortDestination_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="create-destination-form-control">
            <label className="create-destination-text">Distance</label>
            <br></br>
            <div className="create-destination-select">
              <select
                className="create-destination-select-custom"
                name="DistanceID"
                onChange={handleInput}
              >
                <option value="" disabled selected>
                  select distance
                </option>
                {Distance.map((item) => (
                  <option value={item.ID} key={item.Distance}>
                    {item.Distance}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="buttom-area">
            <button type="submit">ยืนยัน</button>
          </div>
        </Form>
      </div>
    </div>
  );
}
