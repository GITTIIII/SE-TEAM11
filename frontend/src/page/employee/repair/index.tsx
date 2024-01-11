import React, { useEffect, useState } from "react";
import {  NavLink } from "react-router-dom";
import "./repair.css";
import { DeleteOutlined,EditOutlined } from "@ant-design/icons";
import {
  Button,
  message,
  ConfigProvider,
  Table,
  Modal,
} from "antd";
import ship from "../../../asset/ship.jpg";
import type { ColumnsType } from "antd/es/table";

import {
  GetAllRepair,
  DeleteRepairByID,
} from "../../../services/https/repair";
import { RepairInterface } from "../../../interface/IRepair";
import { RepairTypeInterface } from "../../../interface/IRepairType";
import { render } from "@testing-library/react";
import RepairEdit from "./repairEdit";

export default function Repair() {

  const [messageApi, contextHolder] = message.useMessage();
  const [listRepair, setAllRepair] = useState<RepairInterface[]>([]);
  const [showEdit, setShowEdit] = useState(false);

  // Model
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const getAllRepair = async () => {
    let res = await GetAllRepair();
    if (res) {
      setAllRepair(res);
    }
  };

  useEffect(() => {
    getAllRepair();
  }, []);

  const handleDelete  = async (id : Number|undefined) => {
    let res = await await DeleteRepairByID(id);
      if (res) {
        messageApi.open({
          type: "success",
          content: "ลบข้อมูลสำเร็จ",
        });
        setTimeout(function () {
          window.location.reload();
        }, 500);
      } else {
        messageApi.open({
          type: "error",
          content: "ลบข้อมูลไม่สำเร็จ",
        });
      }
  }

  const handleClose = () => setShowEdit(false);

  console.log(showEdit);

  return (
    <>
      <RepairEdit open={showEdit} onClose={handleClose}></RepairEdit>
      <div className="login-bg" style={{ backgroundImage: `url(${ship})` }}>
        {contextHolder}
        <h1 className="repair-text">Repair</h1>
        <div className="repair-form">
        
        <NavLink to="/employee/repair/create">
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#CDF5FD',
                colorTextLightSolid: '#000000',
                colorPrimaryHover: '#89CFF3',
                colorPrimaryActive: '#818FB4'
              },
            }}
          >
            <Button className='room-add-button' type="primary">Repair Request</Button>
          </ConfigProvider>
        </NavLink>
          <thead className="repair-head-table">
            <tr className="repair-head-row">
              <th>ID</th>
              <th>Image</th>
              <th>Type</th>
              <th>Problem</th>
              <th>Time</th>
              {/* <th>Status</th> */}
              <th>Manage</th>
            </tr>
          </thead>
          <tbody>
            {listRepair.map((item,index) => (
              <tr key={index}>
                <td>{item.ID}</td>
                <td><img src={`${item.Repair_img}`} style={{maxWidth:"100px",maxHeight:"100px"}}></img></td>
                <td>{(item.RepairType as RepairTypeInterface) ?.Repair_name}</td>
                <td>{item.Comment}</td>
                <td>{new Date(item.Repair_date!).toLocaleString()}</td>
                <td>
                  <Button icon={<DeleteOutlined/>} onClick={() => handleDelete(item.ID)} ></Button>
                  <Button icon={<EditOutlined />} onClick={() => setShowEdit(true)}></Button>
                </td>
                  
              </tr>
            ))}
          </tbody>
        </div>
      </div>
    </>
  );
}
