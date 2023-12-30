import React, { useEffect, useState } from "react";
import {  NavLink } from "react-router-dom";
import "./repair.css";
import { DeleteOutlined } from "@ant-design/icons";
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

export default function Repair() {
  const columns: ColumnsType<RepairInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "รูปห้องพัก",
      dataIndex: "Repair_img",
      key: "repair_img",
      render: (text, record, index) => (
        <img src={record.Repair_img} className="" width="50%" alt="" />
      ),
    },
    {
      title: "รายละเอียด",
      dataIndex: "Comment",
      key: "comment",
    },
    {
      title: "ประเภท",
      dataIndex: "RepairType",
      key: "repair_type",
      render: (item) => Object.values(item.Repair_name),
    },
    {
      title: "จัดการ",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record, index) => (
        <>
          <Button
            onClick={() => showModal(record)}
            style={{ marginLeft: 10 }}
            shape="circle"
            icon={<DeleteOutlined />}
            size={"large"}
            danger
          />
        </>
      ),
    },
  ];

  const [messageApi, contextHolder] = message.useMessage();
  const [listRepair, setAllRepair] = useState<RepairInterface[]>([]);

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

  const showModal = (val: RepairInterface) => {
    setModalText(`คุณต้องการลบข้อมูลการแจ้งซ่อมลำดับที่ "${val.ID}" หรือไม่ ?`);
    setDeleteId(val.ID);
    setOpen(true);
  };

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await DeleteRepairByID(deleteId);
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
      });
      getAllRepair();
    } else {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="login-bg" style={{ backgroundImage: `url(${ship})` }}>
        {contextHolder}
        <h1 className="repair-text">Repair</h1>
        <div className="repair-form">
          <NavLink to="/employee/repair/create">
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#CDF5FD",
                  colorTextLightSolid: "#000000",
                  colorPrimaryHover: "#89CFF3",
                  colorPrimaryActive: "#818FB4",
                },
              }}
            >
              <Button className="repair-add-button" type="primary">
                Repair Request
              </Button>
            </ConfigProvider>
          </NavLink>
          <div style={{ marginTop: 20 }}>
            <Table rowKey="ID" columns={columns} dataSource={listRepair} />
          </div>

          <Modal
            title="ลบข้อมูล ?"
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <p>{modalText}</p>
          </Modal>
        </div>
      </div>
    </>
  );
}
