import React, { ChangeEvent, useEffect, useState } from "react";
import "./repairEdit.css";
import { Button, Form, message } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { repairIDContext } from "..";

import { GetRepairById, UpdateRepair } from "../../../../services/https/repair";
import { GetAllRepairType } from "../../../../services/https/repairType";
import { RepairInterface } from "../../../../interface/IRepair";
import { RepairTypeInterface } from "../../../../interface/IRepairType";
import { RoomInterface } from "../../../../interface/IRoom";

function RepairEdit() {
  const [type, setType] = useState<RepairTypeInterface[]>([]);
  const [repair, setRepair] = useState<RepairInterface>();
  const [input, setInput] = useState({} as RepairInterface);
  const [repair_img, setRepair_Img] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const repairID = useContext(repairIDContext);

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


  

  const handleSubmit = async () => {
    let updatedValues: RepairInterface = {
      ID: Number(repairID),
      Comment: input.Comment,
      Repair_img: repair_img,
      Repair_status: "กำลังดำเนินการ",
      RepairTypeID: Number(input.RepairTypeID),
      EmployeeID: Number(localStorage.getItem("EmployeeID")),
      RoomID: input.RoomID,
    };

    console.log(updatedValues);
    console.log(input);
    let res = await UpdateRepair(updatedValues);
    if (res.status) {
      messageApi.open({
        type: "success",
        content: "เเก้ไขข้อมูลสำเร็จ",
      });
      // setTimeout(function () {
      //   window.location.reload();
      // }, 500);
    } else {
      messageApi.open({
        type: "error",
        content: res.message,
      });
      console.log(res.message);
    }
  };

  console.log(repairID);
  console.log(repair?.Comment);

  return (
    <>
      <div className="repair-edit">
        {contextHolder}
        <h1>Repair Edit</h1>
        <h3>RoomNumber : {(repair?.Room as RoomInterface)?.Room_number}</h3>
        <Form onFinish={handleSubmit}>
          <select   
            className="repair-edit-form"
            name="RepairTypeID"
            onChange={handleInput}
          >
            <option value="none" hidden>
              เลือกประเภท
            </option>
            {type.map((item) => (
              <option value={item.ID} key={item.Repair_name}>
                {item.Repair_name}
              </option>
            ))}
          </select>
          <input
            type="textarea"
            className="repair-textarea"
            placeholder="Enter your detail"
            name="Comment"
            onChange={handleInput}
          />
          <input
            id="Repair_img"
            type="file"
            accept="image/*"
            name="Repair_img"
            onChange={handleImageChange}
          />
          <div className="buttom-area">
            <button type="submit">ยืนยัน</button>
          </div>
        </Form>
      </div>
    </>
  );
}

export default RepairEdit;
