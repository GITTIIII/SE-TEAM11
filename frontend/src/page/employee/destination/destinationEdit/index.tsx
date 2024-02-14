import React, { ChangeEvent, useEffect, useState } from "react";
import "./destinationEdit.css";
import { Button, Form, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { destinationIDContext } from "..";

import {
  GetDestinationById,
  UpdateDestination,
} from "../../../../services/https/destination";
import { GetAllPortOrigin } from "../../../../services/https/portOrigin";
import { GetAllPortDestination } from "../../../../services/https/portDestination";
import { GetAllDistance } from "../../../../services/https/distance";
import { DestinationInterface } from "../../../../interface/IDestination";
import { PortOriginInterface } from "../../../../interface/IPortOrigin";
import { PortDestinationInterface } from "../../../../interface/IPortDestination";
import { DistanceInterface } from "../../../../interface/IDistance";

function DestinationEdit({ onCancel }: { onCancel: () => void }) {
  const [destination, setDestination] = useState<DestinationInterface>();
  const [portOrigin, setPortOrigin] = useState<PortOriginInterface[]>([]);
  const [portDestination, setPortDestination] = useState<
    PortDestinationInterface[]
  >([]);
  const [distance, setDistance] = useState<DistanceInterface[]>([]);
  const [input, setInput] = useState({} as DestinationInterface);
  const [destination_img, setDestination_Img] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const destinationID = useContext(destinationIDContext);

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

  const getDestinationByID = async () => {
    let res = await GetDestinationById(Number(destinationID));
    setDestination(res);
    setInput(res);
  };

  useEffect(() => {
    getPortOrigin();
    getPortDestination();
    getDistance();
    getDestinationByID();
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
        setDestination_Img(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // console.log(roomID);
  // console.log(repair?.Comment);
  // console.log(Object(repair).repairType?.Repair_name);

  const handleSubmit = async () => {
    let updatedValues: DestinationInterface = {
      ID: Number(destinationID),
      Destination_name: input.Destination_name,
      PortOriginID: Number(input.PortOriginID),
      PortDestinationID: Number(input.PortDestinationID),
      Comment: input.Comment,
      DistanceID: Number(input.DistanceID),
      EmployeeID: Number(localStorage.getItem("EmployeeID")),
      // RoomID: input.RoomID,
      // Repair_date: rDate,
    };

    console.log(updatedValues);
    console.log(input);
    let res = await UpdateDestination(updatedValues);
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
      <div className="update-destination">
        {contextHolder}
        <div className="update-destination-close-button">
          <Button type="text" icon={<CloseOutlined />} onClick={onCancel} />
        </div>

        <div className="update-destination-header">
          <h2>
            แก้ไขข้อมูลท่าเรือต้นทาง - ปลายทาง : {destination?.Destination_name}
          </h2>
        </div>

        <div className="update-destination-form">
          <Form onFinish={handleSubmit}>
            <div className="update-destination-form-info">
              <label>ท่าเรือต้นทาง - ปลายทาง</label>
              <br></br>
              <textarea
                className="update-destination-input"
                placeholder="Enter your detail"
                name="Destination_name"
                defaultValue={Object(destination).Destination_name}
                onChange={handleInput}
              />

              <label>ท่าเรือต้นทาง</label>
              <br></br>
              <select
                className="update-destination-select-custom"
                name="PortOriginID"
                onChange={handleInput}
              >
                <option
                  value="none"
                  hidden
                  defaultValue={Number(Object(destination).PortOriginID)}
                >
                  {Object(destination).PortOrigin?.PortOrigin_name}
                </option>
                {portOrigin.map((item) => (
                  <option value={item.ID} key={item.PortOrigin_name}>
                    {item.PortOrigin_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="update-destination-form-info">
              <label>ท่าเรือจุดหมาย</label>
              <br></br>
              <select
                className="update-destination-select-custom"
                name="PortDestinationID"
                onChange={handleInput}
              >
                <option
                  value="none"
                  hidden
                  defaultValue={Number(Object(destination).PortDestinationID)}
                >
                  {Object(destination).portDestination?.PortDestination_name}
                </option>
                {portDestination.map((item) => (
                  <option value={item.ID} key={item.PortDestination_name}>
                    {item.PortDestination_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="update-destination-form-info">
              <label>ระยะทาง</label>
              <br></br>
              <select
                className="update-destination-select-custom"
                name="DistanceID"
                onChange={handleInput}
              >
                <option
                  value="none"
                  hidden
                  defaultValue={Number(Object(destination).DistanceID)}
                >
                  {Object(destination).distance?.Distance}
                </option>
                {distance.map((item) => (
                  <option value={item.ID} key={item.Distance}>
                    {item.Distance}
                  </option>
                ))}
              </select>
              <label>หมายเหตุ</label>
              <br></br>
              <textarea
                className="update-destination-input"
                placeholder="ระบบหมายเหตุ"
                name="Comment"
                defaultValue={Object(destination).Comment}
                onChange={handleInput}
              />
            </div>
            <div className="update-destination-button-area">
              <button type="submit">ยืนยัน</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default DestinationEdit;
