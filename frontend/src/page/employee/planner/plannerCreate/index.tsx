import {
  useState,
  useEffect,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { message, Upload, Form, Button } from "antd";
import type { UploadProps } from "antd/es/upload/interface";
import { DestinationInterface } from "../../../../interface/IDestination";
import { CreatePlanner } from "../../../../services/https/planner";
import { GetAllDestination } from "./../../../../services/https/destination";

import "./../plannerCreate/plannerCreate.css";
import "./plannerCreate.css";
import cruise from "../../../../asset/cruise.png";
import { PlannerInterface } from "../../../../interface/IPlanner";

export default function PlannerCreate() {
  const [destination, setDestination] = useState<PlannerInterface[]>([]);
  const getDestination = async () => {
    let res = await GetAllDestination();
    if (res) {
      setDestination(res);
    }
  };
  useEffect(() => {
    getDestination();
  }, []);

  const [input, setInput] = useState({
    DestinationID: 0,
  });

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: parseInt(value, 10),
    });
  };

  let navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const [planName, setPlan_name] = useState("");
  const [price, setPrice] = useState("");
  const [plan_img, setPlan_Img] = useState("");

  const handleSubmit = async (values: PlannerInterface) => {
    values.DestinationID = input.DestinationID;
    values.Plan_name = planName;
    values.Price = Number(price);
    values.Plan_img = plan_img;

    console.log(values);

    let res = await CreatePlanner(values);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "บันทึกข้อมูลสำเร็จ",
      });
      setTimeout(function () {
        navigate("/employee/planner");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
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
          setPlan_Img(base64Image); // ตั้งค่า state สำหรับเก็บรูปภาพ
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

      <h1 className="planner-header">Add a trip</h1>

      <div className="planner-headline"></div>

      <div className="create-planner-form">
        <Form onFinish={handleSubmit}>
          <div className="create-planner-form-control">
            <label className="create-planner-text">Name of trip</label>
            <br></br>
            <input
              className="create-planner-input"
              type="text"
              placeholder="Enter name of trip"
              required
              value={planName}
              onChange={(e) => setPlan_name(e.target.value)}
            />
          </div>

          {/* <div className="create-planner-form-control">
            <label className="create-planner-text">Destination</label>
            <br></br>
            <div className="create-planner-select">
              <select
                className="create-planner-select-custom"
                name="DestinationID"
                onChange={handleInput}
              >
                <option value="" disabled selected>
                  select port destination
                </option>
                {Destination.map((item) => (
                  <option value={item.ID} key={item.ortOriginID}>
                    {item.port_origin}
                  </option>
                ))}
              </select>
            </div>
          </div> */}

          <div className="create-planner-form-control">
            <label className="create-planner-text">Price of trip</label>
            <br></br>
            <input
              className="create-planner-input"
              type="number"
              step="0.001"
              placeholder="Enter price of trip"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="create-planner-form-control">
            <label className="create-planner-text">Image of Planner</label>
            <br></br>
            <Upload
              {...props}
              accept="image/png, image/jpeg"
              action="/Planner"
              id="Plan_img"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>

          <div className="buttom-area">
            <button type="submit">ยืนยัน</button>
          </div>
        </Form>
      </div>
    </div>
  );
}
