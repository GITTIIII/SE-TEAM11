import React, { ChangeEvent, useEffect, useState, useRef } from "react";
import "./repairEdit.css";
import { Button, Form, message, DatePicker, DatePickerProps } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { repairIDContext } from "..";

import { GetRepairById, UpdateRepair } from "../../../../services/https/repair";
import { GetAllRepairType } from "../../../../services/https/repairType";
import { RepairInterface } from "../../../../interface/IRepair";
import { RepairTypeInterface } from "../../../../interface/IRepairType";
import { RoomInterface } from "../../../../interface/IRoom";
import dayjs from "dayjs";

function RepairEdit() {
  const [type, setType] = useState<RepairTypeInterface[]>([]);
  const [repair, setRepair] = useState<RepairInterface>();
  const [input, setInput] = useState({} as RepairInterface);
  const [repair_img, setRepair_Img] = useState("");
  const [rDate, setRDate] = useState<any>(dayjs());
  const [messageApi, contextHolder] = message.useMessage();

  const repairID = useContext(repairIDContext);

  const inputRef = useRef(null);

  const getRepairType = async () => {
    let res = await GetAllRepairType();

    if (res) {
      setType(res);
    }
  };

  const getRepairByID = async () => {
    let res = await GetRepairById(Number(repairID));
    setRepair(res);
    setInput(res);
  };

  useEffect(() => {
    getRepairType();
    getRepairByID();
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
        setRepair_Img(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const onChange = (date: dayjs.Dayjs | null, dateString: string) => {
    console.log(date);
    setRDate(date);
  };

  console.log(repairID);
  console.log(repair?.Comment);
  console.log(Object(repair).repairType?.Repair_name);

  const handleSubmit = async () => {
    let updatedValues: RepairInterface = {
      ID: Number(repairID),
      Comment: input.Comment,
      Repair_img: repair_img,
      Repair_status: input.Repair_status,
      RepairTypeID: Number(input.RepairTypeID),
      EmployeeID: Number(localStorage.getItem("EmployeeID")),
      RoomID: input.RoomID,
      Repair_date: rDate,
    };

    console.log(updatedValues);
    console.log(input);
    let res = await UpdateRepair(updatedValues);
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
    
      <div className="repair-edit">
        {contextHolder}
        <div className="repair-edit-header">
          <h1>แก้ไขคำขอการแจ้งซ่อม</h1>
        </div>

        <h3>หมายเลขห้องพัก : {(repair?.Room as RoomInterface)?.Room_number}</h3>
        <div className="repair-edit-form">
          <Form onFinish={handleSubmit}>
            <div className="repair-edit-form-info">
              <label>ประเภทการแจ้งซ่อม</label>
              <br></br>
              <select
                className="repair-select-custom"
                name="RepairTypeID"
                onChange={handleInput}
              >
                <option
                  value="none"
                  hidden
                  defaultValue={Number(Object(repair).RepairTypeID)}
                >
                  {Object(repair).RepairType?.Repair_name}
                </option>
                {type.map((item) => (
                  <option value={item.ID} key={item.Repair_name}>
                    {item.Repair_name}
                  </option>
                ))}
              </select>
            </div>
            <label>รายละเอียด</label>
            <br></br>
            <textarea
              className="repair-edit-textarea"
              placeholder="Enter your detail"
              name="Comment"
              defaultValue={Object(repair).Comment}
              onChange={handleInput}
            />
            <label>วันที่ต้องการรับบริการ</label>
            <br></br>
            <DatePicker
              className="repair-edit-form-info"
              value={rDate}
              onChange={onChange}
              format="YYYY-MM-DD"
            />
            <br></br>
            <label>รูปภาพ</label>
            <br></br>
            <input
              className="repair-edit-form-info"
              id="Repair_img"
              type="file"
              accept="image/*"
              name="Repair_img"
              onChange={handleImageChange}
            />
            <br />
            <hr />
            <label >เปลี่ยนสถานะการแจ้งซ่อม</label>
            <br />
            <select
              className="repair-select-custom"
              name="Repair_status"
              onChange={handleInput}
            >
              <option value="none" hidden defaultValue={Number(Object(repair))}>
                {Object(repair).Repair_status}
              </option>

              <option >เสร็จสิ้น</option>
            </select>

            <div className="repair-edit-button-area">
              <button type="submit">ยืนยัน</button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default RepairEdit;
