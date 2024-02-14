import React, { useState, useEffect, ChangeEvent } from "react";
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
  const [messageApi, contextHolder] = message.useMessage();
  const [destinationName, setDestination_name] = useState("");
  const [comment, setComment] = useState("");
  const EmployeeID = localStorage.getItem("EmployeeID");
  const [portOrigin, setPortOrigin] = useState<PortOriginInterface[]>([]);
  const [portDestination, setPortDestination] = useState<
    PortDestinationInterface[]
  >([]);
  const [distance, setDistance] = useState<DistanceInterface[]>([]);
  const getPortOrigin = async () => {
    let res = await GetAllPortOrigin();
    if (res) {
      setPortOrigin(res);
    }
  };
  const getPortDestination = async () => {
    let res = await GetAllPortDestination();
    if (res) {
      setPortDestination(res);
    }
  };
  const getDistance = async () => {
    let res = await GetAllDistance();
    if (res) {
      setDistance(res);
    }
  };

  useEffect(() => {
    getPortOrigin();
    getPortDestination();
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
  const handleSubmit = async (values: DestinationInterface) => {
    values.PortOriginID = input.portOriginID;
    values.PortDestinationID = input.portDestinationID;
    values.DistanceID = input.DistanceID;
    values.EmployeeID = Number(EmployeeID);
    values.Destination_name = destinationName;
    values.Comment = comment;

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
        content: res.message,
      });
    }
  };

  return (
    <div className="create-destination-table-show">
      {contextHolder}
      <h1 className="destination-destination-header">เพิ่มจุดหมาย</h1>

      <hr />
      <div className="create-destination-container">
        <div className="create-destination-imgBG">
          <img src="https://images5.alphacoders.com/882/882843.jpg" alt="" />
        </div>
        <div className="create-destination-form">
          <Form onFinish={handleSubmit}>
            <div className="create-destination-form-control">
              <label
                className="create-destination-text"
                style={{ color: "#535b66" }}
              >
                ท่าเรือเริ่มต้น
              </label>
              <br></br>
              <div className="create-destination-select">
                <select
                  className="create-destination-select-custom"
                  name="portOriginID"
                  onChange={handleInput}
                  // required
                >
                  <option value="" disabled selected>
                    เลือกท่าเรือ
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
              <label
                className="create-destination-text"
                style={{ color: "#535b66" }}
              >
                ท่าเรือจุดหมาย
              </label>
              <br></br>
              <div className="create-destination-select">
                <select
                  className="create-destination-select-custom"
                  name="portDestinationID"
                  onChange={handleInput}
                  // required
                >
                  <option value="" disabled selected>
                    เลือกท่าเรือ
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
              <label
                className="create-destination-text"
                style={{ color: "#535b66" }}
              >
                ต้นทาง - ปลายทาง
              </label>
              <br></br>
              <input
                className="create-destination-input"
                type="text"
                placeholder="ระบุต้นทาง-ปลายทาง"
                value={destinationName}
                onChange={(e) => setDestination_name(e.target.value)}
                // required
              />
            </div>
            <div className="create-destination-form-control">
              <label
                className="create-destination-text"
                style={{ color: "#535b66" }}
              >
                ระยะทาง
              </label>
              <br></br>
              <div className="create-destination-select">
                <select
                  className="create-destination-select-custom"
                  name="DistanceID"
                  onChange={handleInput}
                  // required
                >
                  <option value="" disabled selected>
                    เลือกระยะทาง
                  </option>
                  {distance.map((item) => (
                    <option value={item.ID} key={item.Distance}>
                      {item.Distance}
                    </option>
                  ))}
                </select>
              </div>
              <div className="destination-form-control">
                <label
                  className="create-destination-text"
                  style={{ color: "#535b66" }}
                >
                  หมายเหตุ
                </label>
                <textarea
                  className="destination-textarea"
                  placeholder="หมายเหตุ"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>
            </div>

            <div className="buttom-area">
              <button type="submit">ยืนยัน</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
