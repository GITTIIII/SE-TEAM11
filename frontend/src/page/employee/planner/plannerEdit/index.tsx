import React, { ChangeEvent, useEffect, useState } from "react";
import "./plannerEdit.css";
import { Button, Form, message, DatePicker } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { plannerIDContext } from "..";
import {
  GetPlannerById,
  UpdatePlanner,
} from "../../../../services/https/planner";

import { DestinationInterface } from "../../../../interface/IDestination";
import { PlannerInterface } from "../../../../interface/IPlanner";
import { QuayInterface } from "../../../../interface/IQuay";
import dayjs from "dayjs";
import { GetAllQuay } from "../../../../services/https/quay";

function PlannerEdit({ onCancel }: { onCancel: () => void }) {
  const [planner, setPlanner] = useState<PlannerInterface>();
  const [destination, setDestination] = useState<DestinationInterface>();
  const [input, setInput] = useState({} as PlannerInterface);
  const [quay, setQuay] = useState<QuayInterface[]>([]);
  const [plan_img, setPlan_Img] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [pDate, setPDate] = useState<any>(dayjs());
  const plannerID = useContext(plannerIDContext);

  const getPlannerByID = async () => {
    let res = await GetPlannerById(Number(plannerID));
    setPlanner(res);
    setInput(res);
    setDestination(res);
  };

  const getQuay = async () => {
    let res = await GetAllQuay();
    setQuay(res);
  };
  useEffect(() => {
    getPlannerByID();
    getQuay();
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
        setPlan_Img(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    let updatedValues: PlannerInterface = {
      ID: Number(plannerID),
      Plan_name: input.Plan_name,
      Plan_img: plan_img,
      Plan_price: Number(input.Plan_price),
      TimeStart: pDate,
      Planner_status: input.Planner_status,
      QuayID: Number(input.QuayID),
      DestinationID: Number(input.DestinationID),
      EmployeeID: Number(localStorage.getItem("EmployeeID")),
    };
    console.log(updatedValues);
    console.log(input);
    let res = await UpdatePlanner(updatedValues);
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
      console.log(destination);
    }
  };
  const onChange = (date: dayjs.Dayjs | null, dateString: string) => {
    console.log(date);
    setPDate(date);
  };

  return (
    <>
      <div className="update-planner">
        {contextHolder}
        <div className="update-planner-close-button">
          <Button type="text" icon={<CloseOutlined />} onClick={onCancel} />
        </div>

        <div className="update-planner-header">
          <h2>แก้ไขทริป : {planner?.Plan_name}</h2>
        </div>
        <div className="update-planner-form">
          <Form onFinish={handleSubmit}>
            <label>ชื่อทริป</label>
            <br></br>
            <input
              className="update-planner-input"
              placeholder="Enter your detail"
              name="Plan_name"
              defaultValue={Object(planner).Plan_name}
              onChange={handleInput}
            />
            <label>ชานชาลา</label>
            <br></br>
            <select
              className="update-destination-select-custom"
              name="QuayID"
              onChange={handleInput}
            >
              <option
                value="none"
                hidden
                defaultValue={Number(Object(quay).QuayID)}
              >
                {Object(planner).Quay?.Quay_number}
              </option>
              {quay.map((item) => (
                <option value={item.ID} key={item.Quay_number}>
                  {item.Quay_number}
                </option>
              ))}
            </select>
            <label>ราคาทริป</label>
            <br></br>
            <input
              className="update-planner-input"
              type="number"
              step="0.001"
              placeholder="ระบุราคาทริป"
              name="Plan_price"
              defaultValue={Object(planner).Plan_price}
              onChange={handleInput}
              required
            />
            <br />
            <label>วันเดินเรือ</label>
            <br></br>
            <DatePicker
              className="planner-edit-form-info"
              value={pDate}
              onChange={onChange}
              format="YYYY-MM-DD"
            />
            <br />
            <div className="planner-edit-show-changeStatus">
              <label>เปลี่ยนสถานะออกเรือ</label>
              <br />
              <select
                className="planner-select-custom"
                name="Planner_status"
                onChange={handleInput}
              >
                <option
                  value="none"
                  hidden
                  defaultValue={Number(Object(planner))}
                >
                  {Object(planner).Planner_status}
                </option>

                <option>กำลังออกเรือ</option>
                <option>เรือยังไม่ออก</option>
              </select>
            </div>
            <label>รูปภาพทริป</label>
            <br></br>
            <input
              className="update-planner-form-info"
              id="Plan_img"
              type="file"
              accept="image/*"
              name="Plan_img"
              onChange={handleImageChange}
            />
            <div className="update-planner-button-area">
              <button type="submit">ยืนยัน</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default PlannerEdit;
