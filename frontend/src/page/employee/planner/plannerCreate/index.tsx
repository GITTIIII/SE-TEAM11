import React, { useState, useEffect, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { message, Form, Button, Upload, Select, DatePicker } from "antd";
import type { UploadProps } from "antd/es/upload/interface";
import "./../plannerCreate/plannerCreate.css";
import "./plannerCreate.css";
import {
  CreatePlanner,
  GetAllPlanner,
} from "../../../../services/https/planner";
import { GetAllDestination } from "../../../../services/https/destination";
import { UploadOutlined } from "@ant-design/icons";
import { DestinationInterface } from "../../../../interface/IDestination";
import { PlannerInterface } from "../../../../interface/IPlanner";
import { QuayInterface } from "../../../../interface/IQuay";
import { GetAllQuay } from "../../../../services/https/quay";
import dayjs from "dayjs";
export default function DestinationCreates() {
  const [quay, setQuay] = useState<QuayInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [planName, setPlanner_name] = useState("");
  const [pDate, setPDate] = useState<any>(dayjs());
  const [planPrice, setPlanner_price] = useState("");
  const [planner_img, setPlanner_Img] = useState("");
  const [destinationName, setDestinationName] = useState<
    DestinationInterface[]
  >([]);
  const [Destination, setDestination] = useState<DestinationInterface[]>([]);
  const [PlannerID, setPlannerID] = useState(0);
  const [Planner, setPlanner] = useState<PlannerInterface[]>([]);
  const [listPlanner, setAllPlanner] = useState<PlannerInterface[]>([]);
  const [listDestination, setAllDestination] = useState<DestinationInterface[]>(
    []
  );
  const EmployeeID = localStorage.getItem("EmployeeID");
  const getQuay = async () => {
    let res = await GetAllQuay();
    if (res) {
      setQuay(res);
    }
  };
  const getAllPlanner = async () => {
    let res = await GetAllPlanner();
    if (res) {
      setAllPlanner(res);
    }
  };
  const getAllDestination = async () => {
    let res = await GetAllDestination();
    if (res) {
      setAllDestination(res);
    }
  };
  const getDestination = async () => {
    let res = await GetAllDestination();

    if (res) {
      setDestinationName(res);
    }
  };
  useEffect(() => {
    getAllPlanner();
    getAllDestination();
    getDestination();
    getQuay();
    console.log();
  }, []);
  const onChange = (date: dayjs.Dayjs | null, dateString: string) => {
    console.log(date);
    setPDate(date);
  };

  const [input, setInput] = useState({
    DestinationID: 0,
    QuayID: 0,
  });
  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: parseInt(value, 10),
    });
  };
  let navigate = useNavigate();
  const handleSubmit = async (values: PlannerInterface) => {
    values.DestinationID = input.DestinationID;
    values.Plan_img = planner_img;
    values.EmployeeID = Number(EmployeeID);
    values.Plan_price = Number(planPrice);
    values.Plan_name = planName;
    values.TimeStart = pDate;
    values.QuayID = input.QuayID;
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
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string; // Type assertion to string
        // เปลี่ยน setImage เพื่อทำการใช้ base64String
        setPlanner_Img(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  console.log(quay);
  return (
    <div className="create-planner-table-show">
      {contextHolder}
      <h1 className="planner-planner-header">เพิ่มทริป</h1>

      <hr />
      <div className="create-planner-container">
        <div className="create-planner-imgBG">
          <img src="https://images3.alphacoders.com/863/863668.jpg" alt="" />
        </div>
        <div className="create-planner-form">
          <Form onFinish={handleSubmit}>
            <div className="create-planner-form-control">
              <label
                className="create-planner-text"
                style={{ color: "#535b66" }}
              >
                ต้นทาง - จุดหมาย
              </label>
              <br></br>
              <div className="create-planner-select">
                <Select
                  showSearch
                  placeholder="กรุณาเลือกต้นทาง - ปลายทาง"
                  className="planner-select-antd"
                  optionFilterProp="children"
                  onChange={(value) =>
                    handleInput({ target: { name: "DestinationID", value } })
                  }
                  filterOption={filterOption}
                  options={destinationName.map((item) => {
                    return {
                      label: `${item.Destination_name}`,
                      value: `${item.ID}`,
                    };
                  })}
                />
              </div>
            </div>
            <div className="create-planner-form-control">
              <label
                className="create-planner-text"
                style={{ color: "#535b66" }}
              >
                ชื่อทริป
              </label>
              <br></br>
              <input
                className="create-planner-input"
                type="text"
                placeholder="ระบุชื่อทริป"
                value={planName}
                onChange={(e) => setPlanner_name(e.target.value)}
              />
            </div>
            <div className="create-planner-form-control">
              <label
                className="create-planner-text"
                style={{ color: "#535b66" }}
              >
                ชานชาลา
              </label>
              <br></br>
              <div className="create-planner-select">
                <select
                  className="create-planner-select-custom"
                  name="QuayID"
                  onChange={handleInput}
                  // required
                >
                  <option value="" disabled selected>
                    เลือกชานชาลา
                  </option>
                  {quay.map((item) => (
                    <option value={item.ID} key={item.Quay_number}>
                      {item.Quay_number}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="create-planner-form-control">
              <label
                className="create-planner-text"
                style={{ color: "#535b66" }}
              >
                ราคาทริป
              </label>
              <br></br>
              <input
                className="create-planner-input"
                type="number"
                step="0.001"
                placeholder="ระบุราคาทริป"
                value={planPrice}
                onChange={(e) => setPlanner_price(e.target.value)}
                required
              />
            </div>
            <div className="create-planner-form-control">
              <label
                className="create-planner-text"
                style={{ color: "#535b66" }}
              >
                วันเดินเรือ
              </label>
              <br></br>
              <DatePicker
                value={pDate}
                onChange={onChange}
                format="YYYY-MM-DD"
              />
            </div>
            <div className="create-planner-form-control">
              <label
                className="create-planner-text"
                style={{ color: "#535b66" }}
              >
                อัปโหลดรูปทริป
              </label>
              <br></br>
              <input
                className="CreatePlanner-input-file"
                id="plan_img"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
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
